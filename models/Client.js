//defining a schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-Local-Mongoose");
const clientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  }
});
clientSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("Client", clientSchema);
