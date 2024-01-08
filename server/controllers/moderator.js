const PostForModeration = require("../models/postForModeration");

exports.working = async (req, res) => {
  // get all posts from the database
  console.log("working");
  const posts = await PostForModeration.find({});

  console.log(posts);

  res.json({ posts: posts });
};
