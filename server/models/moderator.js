const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const moderatorSchema = new mongoose.Schema({
  moderatorId: {
    type: String,
    required: true,
  },

  //content moderator doesn't need a profile pic

  password: {
    type: String,
    required: true,
  },
});

moderatorSchema.pre("save", async function (next) {
  try {
    // hash password if only editing / new moderator
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

module.exports = mongoose.model("Moderator", moderatorSchema);
