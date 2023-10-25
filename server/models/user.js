const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  friends: [userSchema],
});

module.exports = mongoose.model("User", userSchema);
