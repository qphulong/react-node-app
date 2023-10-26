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

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 'User' is the model name of the userSchema
    },
  ], // change to avoid circular reference
});

userSchema.plugin(AutoIncrement, { id: "order_seq", inc_field: "userId" }); //auto increment id

module.exports = mongoose.model("User", userSchema);
