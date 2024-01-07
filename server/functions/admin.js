const Post = require("../models/post");
const bcrypt = require("bcrypt");

async function assignModerator(userId, res) {
  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(400).send("User not found!");
    return;
  }

  user.isModerator = true;

  user
    .save()
    .then((user) => {
      res.send("User assigned as a moderator successfully!");
    })
    .catch((error) => {
      res.status(400).send("Error saving user:", error);
    });
}

async function unassignModerator(userId, res) {
  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(400).send("User not found!");
    return;
  }

  user.isModerator = false;

  user
    .save()
    .then((user) => {
      res.send("User unassigned as a moderator successfully!");
    })
    .catch((error) => {
      res.status(400).send("Error saving user:", error);
    });
}

module.exports = {
  assignModerator,
  unassignModerator,
};
