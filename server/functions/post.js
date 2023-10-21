const Post = require("../models/post");

//find a specific posst and a like to it
async function addLikeToPost(postId) {
  try {
    const post = await Post.findOne({ postId });
    if (post) {
      //if post is not null
      await post.addLike();
      console.log(`Like added to post with ID: ${postId}`);
    } else {
      console.log(`Post with ID ${postId} not found.`);
    }
  } catch (error) {
    console.error("Error adding like:", error);
  }
}

async function editPost(postId, newContent) {
  try {
    const post = await Post.findOne({ postId });
    if (post) {
      //if post is not null
      await post.editPost(newContent);
      console.log(`Content edited to post with ID: ${postId}`);
    } else {
      console.log(`Post with ID ${postId} not found.`);
    }
  } catch (error) {
    console.error("Error editing content:", error);
  }
}
