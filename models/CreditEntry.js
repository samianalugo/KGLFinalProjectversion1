const mongoose = require('mongoose');

const CreditEntrySchema = new mongoose.Schema({
  buyername: {
    type: String,
    required: true
  },
  nationalid: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  amountdue: {
    type: Number,
    required: true
  },
  salesagentname: {
    type: String,
    required: true
  },
  duedate: {
    type: Date,
    required: true
  },
  dispatchdate: {
    type: Date,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  typeproduce: {
    type: String,
    required: true
  },
  produce: {
    type: String,
    enum: ['grainmaize', 'soybeans', 'cowpeas', 'gnuts', 'beans'],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
}, { timestamps: true });

module.exports = mongoose.model('CreditEntry', CreditEntrySchema);
