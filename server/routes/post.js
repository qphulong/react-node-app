const express = require("express");
const postController = require("../controllers/post");
const { query } = require("express-validator");

const router = express.Router();

router.get("/", postController.getPosts);

router.post(
  "/",
  query("content").notEmpty(), //call this validation middleware first to validate
  query("user").notEmpty(),
  query("postId").notEmpty(),
  postController.createPost //then call this to upload post to database
);
//call to create posts

router.delete("/", postController.deletePost); //delete post

router.put("/", postController.editPost); //edit post with PUT request

router.post("/comments", postController.addComment); //add comment

router.put("/report", postController.reportPost); //report post

module.exports = router;
