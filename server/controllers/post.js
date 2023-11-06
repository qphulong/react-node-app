const Post = require("../models/post");
const postFunctions = require("../functions/post");
const User = require("../models/user");

exports.createPost = async (req, res) => {
  const {
    content,
    postId,
    time,
    deleteAfter,
    likes,
    comments,
    userId,
    imageUrls,
  } = req.body;

  console.log(userId);

  const user = await User.findOne({ userId: userId }); //find user
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const post = new Post({
    content,
    postId,
    time,
    deleteAfter,
    likes,
    comments,
    imageUrls,
    user: user,
  }); //create new post

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

  User.findOne({ userId: userId })
    .populate("friends", "userId") // join friends field (reference to the User schema) and select userId field (of the referenced schema)
    .exec()
    .then((user) => {
      //current user with passed userId
      if (!user) {
        // user not found
        return res.status(404).json({ message: "User not found" });
      }

      // get id values of Friends (populated above) of the current user
      const friends = user.friends.map((friend) => friend._id);
      console.log(friends);

      // find using document _id value
      Post.find({ user: { $in: friends } })
        .select("content postId time") // Specify the fields you want to retrieve from Post
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
