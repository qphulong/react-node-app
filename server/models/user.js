const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence");

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

userSchema.plugin(AutoIncrement, { id: "order_seq", inc_field: "userId" }); //auto increment id

module.exports = mongoose.model("User", userSchema);
