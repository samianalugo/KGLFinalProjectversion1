//defining a schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-Local-Mongoose");
const creditproduceSchema = new mongoose.Schema({
  buyername: {
    type: String,
    trim: true,
  },
  nationalid: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    trim: true,
  },
  amountdue: {
    type: Number,
    trim: true,
  },

  salesagentname: {
    type: String,
    trim: true
  },
  duedate: {
    type: Date,
    trim: true
  },
  dispatchdate: {
    type: Date,
    trim: true
  }
});

module.exports = mongoose.model("creditproduce", creditproduceSchema);
