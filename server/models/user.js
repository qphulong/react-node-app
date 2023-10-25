const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String,
  },

  friends: [userSchema],
});

module.exports = mongoose.model("User", userSchema);
