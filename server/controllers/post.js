const Post = require("../models/post");
const User = require("../models/user");
const postFunctions = require("../functions/post");

const crypto = require("crypto");

exports.getPost = (req, res) => {
  const postId = req.params.postId;

  const post = Post.findOne({ postId: postId })
    .select("user content postId createdAt likes") // Specify the fields you want to retrieve from Post
    .then((post) => {
      res.json({ post: post });
    })
    .catch((err) => res.status(404).json({ message: "Post not found" }));
};

exports.createPost = async (req, res) => {
  const { content, deleteAfter, userId, postId } = req.body; //get from json

  const user = await User.findOne({ userId: userId }); //find user
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  var id = "";
  if (postId) {
    // check if postId exists
    const post = Post.findOne({ postId: postId });
    if (post) {
      res.status(500).json({
        error: "Post id already exists",
      });
    }

    id = postId;
  } else {
    id = crypto.randomBytes(16).toString("hex");
  }

  const post = new Post({
    content,
    postId: id,
    deleteAfter,
    likes: 0,
    likePeople: [],
    comments: [],
    user: user,
  }); //create new post

  // postFunctions.checkPostLimit(content); //check post limit

  post
    .save()
    .then((savedPost) => {
      // Successfully saved to the database, send the saved post as JSON response
      res.json({
        // only show content and postid
        post: savedPost.postId,
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

//retrieve all posts from my user and my friends
exports.getPosts = (req, res) => {
  const userId = req.params.userId;

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
      // add current user's id to the list of friends
      friends.push(user._id);

      Post.find({ user: { $in: friends } })
        // add user field (reference to the User schema) and select userId field (of the referenced schema)
        .populate("user", "userId")
        .select("user content postId createdAt likes") // Specify the fields you want to retrieve from Post //sort by time
        .sort({ createdAt: -1 })
        .then((posts) => {
          res.json({ posts: posts });
        })
        .catch((err) => res.status(404).json({ message: "Posts not found" }));
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  postFunctions.deletePost(postId); //delete post with postId in API
  res.send("Post deleted");
};

exports.editPost = (req, res) => {
  const postId = req.body.postId;
  const newContent = req.body.newContent;
  postFunctions.editPost(postId, newContent, res); //edit content with postId in API
};

exports.addComment = (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const comment = req.body.comment;
  postFunctions.addComment(postId, userId, comment, res); //add comment with postId in API
};

exports.reportPost = (req, res) => {
  const postId = req.body.postId;

  postFunctions.reportPost(postId, res); //report post
};

exports.getImages = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findOne({ postId: postId });

  res.json({ images: post.retrieveImages() });
};

exports.getComments = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findOne({ postId: postId });

  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }

  var comments = [];

  for (let i = 0; i < post.comments.length; i++) {
    const comment = post.comments[i];
    const user = await User.findOne({ _id: comment.user });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const id = user.userId;
    comments.push({
      content: comment.content,
      user: id,
      likes: comment.likes,
      createdAt: comment.createdAt,
    });
  }

  res.json({ comments: comments });
};
