const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { Loan, Hospital, User } = require('../models');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const LOAN_STATUS_CHANGED = 'LOAN_STATUS_CHANGED';

const loanResolvers = {
  Query: {
    getLoan: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Loan.findById(id).populate('patient hospital');
    },
    getMyLoans: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Loan.find({ patient: user.id }).populate('hospital');
    },
    getHospitalLoans: async (_, { hospitalId }, { user }) => {
      if (!user || user.role !== 'HOSPITAL_ADMIN') 
        throw new AuthenticationError('You must be a hospital admin to view hospital loans');
      
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital || !hospital.admins.includes(user.id))
        throw new AuthenticationError('You are not an admin of this hospital');

      return await Loan.find({ hospital: hospitalId }).populate('patient');
    },
  },
  Mutation: {
    requestLoan: async (_, { hospitalId, amount, collateral }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');

      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) throw new UserInputError('Invalid hospital ID');

      const repaymentAmount = amount * 1.05; // 5% interest

      const newLoan = new Loan({
        patient: user.id,
        hospital: hospitalId,
        amount,
        collateral,
        repaymentAmount,
        status: 'REQUESTED',
        requestTimestamp: new Date(),
      });

      const savedLoan = await newLoan.save();
      pubsub.publish(LOAN_STATUS_CHANGED, { loanStatusChanged: savedLoan });

      return savedLoan;
    },
    approveLoan: async (_, { loanId }, { user }) => {
      if (!user || user.role !== 'HOSPITAL_ADMIN') 
        throw new AuthenticationError('You must be a hospital admin to approve loans');

      const loan = await Loan.findById(loanId).populate('hospital');
      if (!loan) throw new UserInputError('Invalid loan ID');

      if (!loan.hospital.admins.includes(user.id))
        throw new AuthenticationError('You are not an admin of this hospital');

      if (loan.status !== 'REQUESTED')
        throw new UserInputError('Loan is not in a requestable state');

      loan.status = 'APPROVED';
      loan.approvalTimestamp = new Date();

      const updatedLoan = await loan.save();
      pubsub.publish(LOAN_STATUS_CHANGED, { loanStatusChanged: updatedLoan });

      return updatedLoan;
    },
    // Implement rejectLoan, disburseLoan, and repayLoan mutations similarly
  },
  Subscription: {
    loanStatusChanged: {
      subscribe: () => pubsub.asyncIterator([LOAN_STATUS_CHANGED]),
    },
  },
};

module.exports = loanResolvers;