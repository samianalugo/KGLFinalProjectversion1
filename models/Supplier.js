//defining a schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-Local-Mongoose");
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
