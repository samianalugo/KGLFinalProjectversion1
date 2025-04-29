//defining a schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-Local-Mongoose");
const saleSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    trim: true,
  },
  amountprice: {
    type: Number,
    trim: true,
  },
  buyername: {
    type: String,
    trim: true,
  },
  salesagentname: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  },

  produce: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Sale", saleSchema);
