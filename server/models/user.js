const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

  friendshipLink: {
    linkId: {
      type: String,
    },
    password: {
      type: String,
    },
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 'User' is the model name of the userSchema
    },
  ], // change to avoid circular reference

  isContentModerator: {
    type: Boolean,
    required: true,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },

  // array of json with link and social network type
  otherSocialMedia: [
    {
      type: JSON,
    },
  ],
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

userSchema.pre("save", async function (next) {
  try {
    // hash authenticationPassword if only editing / new user
    if (!this.isModified("authenticationPassword")) {
      return next();
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.authenticationPassword, salt);
    this.authenticationPassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.addSocialMedia = async function (link) {
  // check if link is empty
  if (!link) {
    return;
  }

  // check if link is already in the list
  if (this.otherSocialMedia.includes(link)) {
    return;
  }

  // classify the social network
  const socialNetwork = this.classifySocialNetwork(link);

  // add the link to the list
  this.otherSocialMedia.push({
    link: link,
    socialNetwork: socialNetwork,
  });

  await this.save();
};

// dùng với frontend
userSchema.methods.classifySocialNetwork = function (link) {
  // regex to match the social network
  const facebookRegex = /facebook/;
  const twitterRegex = /twitter/;
  const instagramRegex = /instagram/;
  const linkedinRegex = /linkedin/;

  // check if link matches regex
  if (facebookRegex.test(link)) {
    return "Facebook";
  } else if (twitterRegex.test(link)) {
    return "Twitter";
  } else if (instagramRegex.test(link)) {
    return "Instagram";
  } else if (linkedinRegex.test(link)) {
    return "Linkedin";
  } else {
    return "Other";
  }
};

module.exports = mongoose.model("User", userSchema);
