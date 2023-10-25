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
  await Post.updateOne({ postId: postId }, { content: newContent });
}

async function deletePost(postId) {
  await Post.deleteOne({ postId: postId }); //delete post
}

async function run() {
  Post.watch().on("change", (data) => console.log("New data changed: ", data));
}

async function addComment(postId, comment) {
  Post.findOne({ postId: postId }, (err, post) => {
    if (err) {
      console.error(err);
    } else {
      post.addComment(comment); //add comment to the post

      post.save((err, updatedPost) => {
        if (err) {
          console.error(err);
        } else {
          console.log("New comment added:", updatedPost);
        }
      });
    }
  });
}

module.exports = {
  addLikeToPost,
  editPost,
  deletePost,
  run,
  addComment,
};
