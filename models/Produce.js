//defining a schema
const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  typeproduce: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    trim: true,
  },
  costprice: {
    type: Number,
    trim: true,
  },
  sellingprice: {
    type: Number,
    trim: true,
  },
  dealername: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
  },

  phoneNumber: {
    type: Number,
    trim: true
  },
  prodname: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Produce", produceSchema);
