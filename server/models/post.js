const mongoose = require("mongoose");
const { commentSchema } = require("./comment");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },

  postId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },

  time: {
    type: String,
    required: true,
  },

  deleteAfter: {
    type: Number,
  },

  likes: {
    type: Number,
    required: true,
  },
});

postSchema.methods.addLike = async function () {
  this.likes++;

  await this.save(); //save to database
};

postSchema.method.editPost = async function (newContent) {
  this.content = newContent;

  await this.save();
};

module.exports = mongoose.model("Post", postSchema);
//to the collection named "posts"
