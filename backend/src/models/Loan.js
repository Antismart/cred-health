const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  amount: { type: Number, required: true },
  collateral: { type: Number, required: true },
  repaymentAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['REQUESTED', 'APPROVED', 'REJECTED', 'DISBURSED', 'REPAID', 'DEFAULTED'],
    default: 'REQUESTED'
  },
  requestTimestamp: { type: Date, default: Date.now },
  approvalTimestamp: { type: Date },
  disbursementTimestamp: { type: Date },
  repaymentTimestamp: { type: Date },
  blockchainTxHash: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Loan', LoanSchema);