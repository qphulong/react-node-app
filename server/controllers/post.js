exports.createPost = (req, res) => {
  const Post = require("../models/post");
  const post = new Post(req.body);

  console.log("CREATING POST: ", post);
};
