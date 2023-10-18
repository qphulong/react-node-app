const express = require("express");
const postController = require("../controllers/post");
const { query } = require("express-validator");

const router = express.Router();

router.get("/posts", postController.getPosts);
router.post(
  "/posts",
  query("content").notEmpty(), //call this validation middleware first to validate
  query("postId").notEmpty(),
  postController.createPost //then call this to upload post to database
);
//call to create posts

module.exports = router;
