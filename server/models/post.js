const mongoose = require("mongoose");

const schema = new mongoose.Schema({
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

schema.methods.addLike = async function () {
  this.likes++;

  await this.save(); //save to database
};

schema.method.editPost = async function (newContent) {
  this.content = newContent;

  await this.save();
};

module.exports = mongoose.model("Post", schema);
//to the collection named "posts"
