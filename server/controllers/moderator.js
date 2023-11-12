const moderatorFunctions = require("../functions/moderator");

exports.deletePost = (req, res) => {
  const postId = req.body.postId;
  moderatorFunctions.removePost(postId);
};

exports.consider = (req, res) => {};
