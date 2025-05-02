<<<<<<< HEAD
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
=======
// server/models/User.js
const mongoose = require("mongoose");            // ← Make sure this line is here

const userSchema = new mongoose.Schema({
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
<<<<<<< HEAD
=======
    enum: ["user", "admin"],                   // only these two values
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    default: "user",
  },
});

<<<<<<< HEAD
const User = mongoose.model("User", UserSchema);
module.exports = User;
=======
module.exports = mongoose.model("User", userSchema);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
