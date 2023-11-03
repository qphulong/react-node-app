const Post = require("../models/post");
const postFunctions = require("../functions/post");

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

//retrieve all posts from my id and my friends
exports.getPosts = (req, res) => {
  const userId = req.body.userId;

  User.findOne({ user: userId })
    .populate("friends", "userId") // Populate friends field (reference to the User schema) and select userId field
    .exec()
    .then((user) => {
      if (!user) {
        // user not found
        return res.status(404).json({ message: "User not found" });
      }

      // get userId values of Friends (populated above)
      const userIdArray = user.friends.map((friend) => friend.userId);

      Post.find({ user: { $in: friends.map((friend) => friend._id) } })
        .populate("user") // to check condition of userId is matched with the reference to the User schema from the Post schema
        .select("content postId time") // Specify the fields you want to retrieve from Post
        .exec()
        .then((posts) => {
          res.render("post", { posts: posts });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.deletePost = (req, res) => {
  const postId = req.body.postId;
  postFunctions.deletePost(postId); //delete post with postId in API
};

exports.editPost = (req, res) => {
  const postId = req.body.postId;
  const newContent = req.body.newContent;
  postFunctions.editPost(postId, newContent); //edit content with postId in API
};

exports.addComment = (req, res) => {
  const postId = req.body.postId;
  const comment = req.body.comment;
  postFunctions.addComment(postId, comment); //add comment with postId in API
};
