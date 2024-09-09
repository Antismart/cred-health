const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { Hospital, User } = require('../models');

const hospitalResolvers = {
  Query: {
    getHospital: async (_, { id }) => {
      return await Hospital.findById(id).populate('admins');
    },
    getAllHospitals: async () => {
      return await Hospital.find().populate('admins');
    },
  },
  Mutation: {
    addHospital: async (_, { name, address, walletAddress }, { user }) => {
      if (!user || user.role !== 'HOSPITAL_ADMIN') 
        throw new AuthenticationError('You must be a hospital admin to add a hospital');

      const existingHospital = await Hospital.findOne({ walletAddress });
      if (existingHospital) throw new UserInputError('Hospital with this wallet address already exists');

      const newHospital = new Hospital({ 
        name, 
        address, 
        walletAddress,
        admins: [user.id] 
      });

      const savedHospital = await newHospital.save();
      await User.findByIdAndUpdate(user.id, { $push: { adminOf: savedHospital.id } });

      return savedHospital;
    },
  },
};

module.exports = hospitalResolvers;