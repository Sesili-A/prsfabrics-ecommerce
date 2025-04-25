// server/models/User.js
const mongoose = require("mongoose");            // ← Make sure this line is here

const userSchema = new mongoose.Schema({
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
    enum: ["user", "admin"],                   // only these two values
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
