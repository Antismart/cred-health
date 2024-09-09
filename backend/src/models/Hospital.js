const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  totalLoansProcessed: { type: Number, default: 0 },
  totalAmountDisbursed: { type: Number, default: 0 },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', HospitalSchema);

