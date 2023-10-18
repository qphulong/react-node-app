const Post = require("../models/post");

exports.createPost = (req, res) => {
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

//retrieve all posts from MongoDB
exports.getPosts = (req, res) => {
  const posts = Post.find()
    .select("content postId time") //only select columns content, postId, and time
    .then((posts) => {
      res.status(200).json({ posts: posts }); //retrieve all collection on posts
    })
    .catch((err) => console.log(err));
};
