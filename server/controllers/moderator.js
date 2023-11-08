const { deletePost } = require("../functions/post");
const moderatorFunctions = require("../functions/moderator");
const Moderator = require("../models/moderator");

exports.signIn = (req, res) => {
    const moderatorId = req.body.moderatorId;
    const password = req.body.password;

    moderatorFunctions.signIn(moderatorId, password);
};

exports.changePassword = (req, res) => {
    const moderatorId = req.body.moderatorIdId;
    const newPassword = req.body.newPassword;

    const confirmPassword = req.body.confirmPassword;

    moderatorFunctions.changePassword(moderatorId, newPassword, confirmPassword);
};

exports.deletePost = (req, res) => {
    const postId = req.body.postId;
    moderatorFunctions.removePost(postId);
};