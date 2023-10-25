const userFunctions = require("../functions/user");

exports.signIn = (req, res) => {};

exports.signUp = (req, res) => {};

exports.changePassword = (req, res) => {
  const userId = req.body.userId;
  const newPassword = req.body.newPassword;

  const confirmPassword = req.body.confirmPassword;

  userFunctions.changePassword(userId, newPassword, confirmPassword);
};
