const userFunctions = require("../functions/user");
const User = require("../models/user");

exports.signUp = (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  const newUser = new User({
    userId: userId,
    password: password,
  });

  newUser
    .save()
    .then(() => {
      console.log("Sign up successfully.");
    })
    .catch((error) => {
      console.error("Error saving user:", error);
    });
};

exports.signIn = (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  userFunctions.signIn(userId, password);
};

exports.changePassword = (req, res) => {
  const userId = req.body.userId;
  const newPassword = req.body.newPassword;

  const confirmPassword = req.body.confirmPassword;

  userFunctions.changePassword(userId, newPassword, confirmPassword);
};
