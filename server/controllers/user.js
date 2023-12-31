const userFunctions = require("../functions/user");
const User = require("../models/user");

const app = require("../app");

exports.signUp = async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  var isAdmin = req.body.isAdmin;

  // check if user already exists
  const user = await User.find({ userId: userId });

  console.log(user.length);
  if (user.length > 0) {
    res.status(400).send("User already exists");
    return;
  }

  if (!isAdmin) {
    isAdmin = false;
  }

  const newUser = new User({
    userId: userId,
    password: password,
    isAdmin: isAdmin,
  });

  newUser
    .save()
    .then((savedUser) => {
      res.json({
        user: savedUser,
      });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

exports.signIn = async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  await userFunctions.signIn(userId, password, res);
};

exports.changePassword = (req, res) => {
  const userId = req.body.userId;
  const newPassword = req.body.newPassword;

  const confirmPassword = req.body.confirmPassword;

  userFunctions.changePassword(userId, newPassword, confirmPassword, res);
};

exports.addFriend = (req, res) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;

  userFunctions.addFriend(userId, friendId, res);
};

exports.removeFriend = (req, res) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;

  userFunctions.removeFriend(userId, friendId, res);
};

exports.friendLink = async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.linkPassword;

  const link = await userFunctions.generateAddFriendLink(userId, password);

  res.json({
    friendLink: link,
  });
};

exports.acceptFriendLink = async (req, res) => {
  var linkId = req.params.linkId; // Get the URL
  const parts = linkId.split("-"); // Split the URL by '/'
  const userId = parts[0]; // Get the user ID, assuming it's always at index 2
  console.log("UserId" + userId);

  const friendId = req.body.friendId;
  const linkPassword = req.body.linkPassword;

  parts.shift();
  linkId = parts.join("-");
  console.log(linkId);

  await userFunctions.linkAddFriend(
    userId,
    linkPassword,
    friendId,
    linkId,
    res
  );
};

exports.addSocialMedia = async (req, res) => {
  const userId = req.body.userId;
  const link = req.body.link;

  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  if (user.otherSocialMedia.length >= 5) {
    res.status(400).send("Maximum number of social media (5) reached");
    return;
  }
  user.addSocialMedia(link);

  return res.json({
    socialMedia: await user.otherSocialMedia,
  }); //send to the frontend to show on the interface
};

exports.getSocialMedia = async (req, res) => {
  const socialMedia = [];

  const user = await User.findOne({ userId: req.params.userId });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.json({
    socialMedia: await user.otherSocialMedia, //send to the frontend to show on the interface
  });
};
