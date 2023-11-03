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

  // Find friends of the user
  User.findOne({ user: userId })
    .populate({
      path: "friends", // friends field
      populate: {
        path: "userId", // populate inside the `friends` array
        select: "userId", // select field to retrieve
      },
    })
    .select("friends") // Select the friends field from
    .exec()
    .then((userWithFriends) => {
      // Extract friend objects from the populated friends field
      const friends = userWithFriends.friends.map((friend) => friend.userId);

      // Get posts from friends
      Post.find({ user: { $in: friends.map((friend) => friend._id) } })
        .populate("userId") // Populate the user field in posts
        .select("content postId time") // Specify the fields you want to retrieve from Post
        .exec()
        .then((posts) => {
          res.render("post", { posts: posts });
        })
        .catch((err) => console.log(err));
    })
    .catch((error) => {
      console.error(error);
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
