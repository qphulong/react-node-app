const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: "Content is required",
    minlength: 1,
    maxlength: 300,
  },

  postId: {
    type: String,
    required: "PostID is required",
    minlength: 1,
    maxlength: 100,
  },

  time: {
    type: String,
    required: "Time is required",
  },

  deleteAfter: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", schema);
//to the collection named "posts"
