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

  if (!user) {
    res.status(404).error("User not found");
  }

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

router.get("/:postId/likes", async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findOne({ postId: postId });

  res.json({ likes: post.likes });
});

router.get("/:userId/:postId/liked", async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  const post = await Post.findOne({ postId: postId });

  const likePeople = post.likePeople;

  var liked = false;

  for (let i = 0; i < likePeople.length; i++) {
    const user = likePeople[i];

    // query to the User model to get user with the same id
    const findUser = await User.findOne({ _id: user });

    if (!findUser) {
      continue;
    }

    if (findUser.userId == userId) {
      liked = true;
      break;
    }
  }

  res.json({ liked: liked });
});

module.exports = router;
