const adminFunctions = require("../functions/admin");
const User = require("../models/user");

exports.assignModerator = (req, res) => {
  const userId = req.body.userId;
  adminFunctions.assignModerator(userId, res);
};

exports.unassignModerator = (req, res) => {
  const userId = req.body.userId;
  adminFunctions.unassignModerator(userId, res);
};
