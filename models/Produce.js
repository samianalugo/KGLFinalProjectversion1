//defining a schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-Local-Mongoose");
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
  date: {
    type: Date,
    trim: true,
  },

  phoneNumber: {
    type: Number,
    trim: true
  }
});

module.exports = mongoose.model("Produce", produceSchema);
