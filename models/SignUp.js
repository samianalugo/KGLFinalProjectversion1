//defining a schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-Local-Mongoose");
const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  branch: {
    type: String,
    enum: ['Matugga', 'Maganjo'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  }
});
signupSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
module.exports= mongoose.model("SignUp", signupSchema);
