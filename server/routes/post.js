const express = require("express");
const postController = require("../controllers/post");
const postValidator = require("../validators");

const router = express.Router();

router.post(
  "/posts",
  postValidator.createPostValidator, //call this validation middleware first to validate
  postController.createPost //then call this to upload post to database
);
//call to create posts

router.module.exports = router;
