const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const PostForModeration = require("../models/postForModeration");

const MAX_LETTERS_LIMIT = 900;

//find a specific post and a like to it
async function addLike(postId) {
  try {
    const post = await Post.findOne({ postId });
    if (post) {
      //if post is not null
      await post.addLike();
      console.log(`Like added to post with ID: ${postId}`);
    } else {
      console.log(`Post with ID ${postId} not found!`);
    }
  } catch (error) {
    console.error("Error adding like:", error);
  }
}

exports.checkPostLimit = (postContent = null) => {
  try {
    // Check letter limit
    if (postContent != null && postContent.length > MAX_LETTERS_LIMIT) {
      throw new Error(
        `Post content exceeds the maximum limit of ${MAX_LETTERS_LIMIT} characters!`
      );
    }

    // If both checks pass, return true
    return true;
  } catch (error) {
    console.error("Error checking post limit:", error.message);
    return false;
  }
};

async function editPost(postId, newContent, res) {
  // checkPostLimit(newContent);
  await Post.updateOne({ postId: postId }, { content: newContent });

  res.json({ postId: postId, newContent: newContent });
}

async function deletePost(postId) {
  await Post.deleteOne({ postId: postId }); //delete post
}

async function run() {
  Post.watch().on("change", (data) => console.log("New data changed: ", data));
}

async function addComment(postId, userId, comment, res) {
  try {
    const post = await Post.findOne({ postId: postId });

    if (!post) {
      res.status(404).send("Post not found");
    }

    const user = await User.findOne({ userId: userId });

    if (!user) {
      res.status(404).send("User not found");
    }

    const newComment = new Comment({
      content: comment,
      user: user,
      likes: 0,
      createdAt: Date.now(),
    });

    await newComment.save(); // Save comment to database

    await post.addComment(newComment); // Add comment to the post

    await post.save();

    res.json({ commentId: newComment._id, comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

async function reportPost(postId, res) {
  try {
    const post = await Post.findOne({ postId });
    if (post) {
      //if post is not null
      const id = post._id;

      const newPostForConsideration = new PostForModeration({
        post: post,
      });
      //add to the report schema
      await newPostForConsideration.save();

      res.json({ reportPost: postId });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addLike,
  editPost,
  deletePost,
  run,
  addComment,
  reportPost,
};
