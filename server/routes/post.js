const express = require("express");
const postController = require("../controllers/post");
const { query } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");

const router = express.Router();

router.get("/:userId", postController.getPosts);

router.get("/:postId", postController.getPost);

router.post(
  "/",
  query("content").notEmpty(), //call this validation middleware first to validate
  query("userId").notEmpty(),
  postController.createPost //then call this to upload post to database
);
//call to create posts

router.delete("/:postId", postController.deletePost); //delete post

router.put("/", postController.editPost); //edit post with PUT request

router.post("/comments", postController.addComment); //add comment

router.get("/comments/:postId", postController.getComments); //get comments

router.post("/report", postController.reportPost); //report post

router.get("/images/:postId", postController.getImages); //get image links of a post

router.put("/likes", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

  const post = await Post.findOne({ postId: postId });
  if (!post) {
    res.status(404).error("Post not found");
  }

  const user = await User.findOne({ userId: userId });

  if (post.likePeople.includes(user)) {
    post.likePeople.pull(user);
    post.likes -= 1;
  } else {
    post.likePeople.push(user);
    post.likes += 1;
  }

  await post.save();

  res.json({ likes: post.likes });
});

module.exports = router;
