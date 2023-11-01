const mongoose = require("mongoose");
const Comment = require("./comment");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
    validate: {
      validator: function (content) {
        return content.length <= 1000;
      },
      message: "Too many characters. Maximum allowed is 1000.",
    },
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

  comments: [Comment.schema],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //reference to another schema
    required: true,
  },

  imageUrls: {
    type: [String],
    validate: {
      validator: function (array) {
        return array.length <= 5;
      },
      message: "Too many images. Maximum allowed is 5.",
    },
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

postSchema.method.addComment = async function (comment) {
  this.comments.push(comment);

  await this.save();
};

module.exports = mongoose.model("Post", postSchema);
//to the collection named "posts"
