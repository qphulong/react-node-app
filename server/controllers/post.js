exports.createPost = (req, res) => {
  const Post = require("../models/post");
  const post = new Post(req.body);

  console.log(req.body);

  post
    .save()
    .then((savedPost) => {
      // Successfully saved to the database, send the saved post as JSON response
      res.json({
        post: savedPost,
      });
    })
    .catch((error) => {
      // Handle error if the post couldn't be saved
      res.status(500).json({
        error: "Error saving the post to the database",
      });
      console.error(error);
    });
};
