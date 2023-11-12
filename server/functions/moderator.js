const { currentUser } = require("../app");
const Post = require("../models/post");
const bcrypt = require("bcrypt");

async function removePost(postId) {
  if (currentUser.isContentModerator == false) {
    return; //if not moderator then stop
  }

  try {
    const post = await Post.findById(postId);
    if (post) {
      await post.deletePost();
    } else {
      console.error(`Post with ID ${postId} not found`);
    }

    console.log(`Post with ID ${postId} removed successfully.`);
  } catch (error) {
    console.error("Error removing post:", error.message);
  }
}

module.exports = {
  removePost,
};
