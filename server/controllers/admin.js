const adminFunctions = require("../functions/admin");
const User = require("../models/user");

exports.showAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.render("user", { users: users });
    })
    .catch((err) => console.log(err));
};

exports.assignModerator = (req, res) => {
  const userId = req.body.userId;
  adminFunctions.assignModerator(userId);
};

exports.unassignModerator = (req, res) => {
  const userId = req.body.userId;
  adminFunctions.unassignModerator(userId);
};
