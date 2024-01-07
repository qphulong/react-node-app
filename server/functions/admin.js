const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcrypt");

async function assignModerator(userId, res) {
  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(400).send("User not found!");
    return;
  }

  user.isModerator = true;

  await user.save();

  res.send("User assigned as a moderator successfully!");
}

async function unassignModerator(userId, res) {
  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(400).send("User not found!");
    return;
  }

  user.isModerator = false;

  await user.save();

  res.send("User unassigned as a moderator successfully!");
}

module.exports = {
  assignModerator,
  unassignModerator,
};
