const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function assignModerator(userId, res) {
  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(400).send("User not found!");
    return;
  }

  await User.updateOne(
    { userId: userId },
    { $set: { isContentModerator: true } }
  );

  res.send("User assigned as a moderator successfully!");
}

async function unassignModerator(userId, res) {
  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(400).send("User not found!");
    return;
  }

  await User.updateOne(
    { userId: userId },
    { $set: { isContentModerator: false } }
  );

  res.send("User unassigned as a moderator successfully!");
}

module.exports = {
  assignModerator,
  unassignModerator,
};
