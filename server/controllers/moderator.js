const { deletePost } = require("../functions/post");

exports.removePost = (req, res) => {
  const postId = req.body.postId;

  deletePost(postId);
};
