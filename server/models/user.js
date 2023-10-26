const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String, // to store url of profile picture
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

//middleware to hash password
userSchema.pre("save", async function (next) {
  try {
    // hash password if only editing / new user
    if (!this.isModified("password")) {
      return next();
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
