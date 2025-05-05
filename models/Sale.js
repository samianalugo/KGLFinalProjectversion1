//defining a schema
const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  saletonnage: {
    type: Number,
    trim: true,
  },
  unitsellingprice: {
    type: Number,
    trim: true,
  },
  amountpaid: {
    type: Number,
    trim: true,
  },
  buyername: {
    type: String,
    trim: true,
  },
  sellername: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SignUp",
  },
  date: {
    type: Date,
    trim: true,
  },
  time: {
    type: String,
    trim: true
  },

  prodname: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Sale", saleSchema);
