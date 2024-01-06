const userFunctions = require("../functions/user");
const User = require("../models/user");

const app = require("../app");

const { CurrentUser } = require("../appController");

exports.signUp = async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  // check if user already exists
  const user = await User.find({ userId: userId });

  console.log(user.length);
  if (user.length > 0) {
    res.status(400).send("User already exists");
    return;
  }

  const newUser = new User({
    userId: userId,
    password: password,
  });

  global.currentUser.set(userId, false);

  newUser
    .save()
    .then((savedUser) => {
      res.json({
        user: savedUser,
      });
    })
    .catch((error) => {
      res.status(500).error(error.message);
    });
};

exports.signIn = async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  await userFunctions.signIn(global.currentUser, userId, password, res);
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
  var linkId = req.params.linkId;
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
    console.log("User not found");
    return;
  }

  user.addSocialMedia(link);

  await user.save();

  return res.json({
    link: link,
    classify: user.classifySocialNetwork(link),
  }); //send to the frontend to show on the interface
};

exports.getSocialMedia = async (req, res) => {
  res.json({
    socialMedia: await userFunctions.getSocialMedia(req.params.userId),
  });
};
