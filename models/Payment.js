//defining a schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-Local-Mongoose");
const paymentSchema = new mongoose.Schema({
  company: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  amountpaid: {
    type: Number,
    trim: true,
  },
  amount: {
    type: Number,
    trim: true,
  },
  amountdue: {
    type: Number,
    trim: true,
  },

  date: {
    type: Date,
    trim: true
  },
  produce: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Payments", paymentSchema);
