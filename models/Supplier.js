//defining a schema
const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  company: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  }
});


module.exports = mongoose.model("Supplier", supplierSchema);
