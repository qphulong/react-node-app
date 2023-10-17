const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();

router.post("/posts", postController.createPost);
//call to create posts

module.exports = router;
