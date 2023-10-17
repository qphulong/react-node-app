const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

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
    type: Date,
    required: "Time is required",
  },

  deleteAfter: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", schema);
