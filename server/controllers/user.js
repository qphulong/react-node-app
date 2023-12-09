const userFunctions = require("../functions/user");
const User = require("../models/user");

const app = require("../app");

exports.signUp = (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  const newUser = new User({
    userId: userId,
    password: password,
  });

  newUser
    .save()
    .then((savedUser) => {
      res.json({
        user: savedUser,
      });
    })
    .catch((error) => {
      console.error("Error saving user:", error);
    });
};

exports.signIn = (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  userFunctions.signIn(currentUser, userId, password);
};

exports.changePassword = (req, res) => {
  const userId = req.body.userId;
  const newPassword = req.body.newPassword;

  const confirmPassword = req.body.confirmPassword;

  userFunctions.changePassword(userId, newPassword, confirmPassword);
};

exports.addFriend = (req, res) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;

  userFunctions.addFriend(userId, friendId);
};

exports.removeFriend = (req, res) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;

  userFunctions.removeFriend(userId, friendId);
};

exports.friendLink = async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  const link = await userFunctions.generateAddFriendLink(userId, password);

  res.json({
    friendLink: link,
  });
};

exports.acceptFriendLink = (req, res) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;
  const linkId = req.body.linkId;
  const linkPassword = req.body.linkPassword;

  userFunctions.linkAddFriend(userId, linkPassword, friendId, linkId);
};
