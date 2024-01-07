const mongoose = require("mongoose");
const Comment = require("./comment");
const { post } = require("../routes/post");

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

  createdAt: {
    type: Date,
    default: Date.now,
  },

  deleteAfter: {
    type: Number,
  },

  likes: {
    type: Number,
    required: true,
    default: 0,
  },

  //list of userids who liked this post
  likePeople: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  comments: [Comment.schema],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //reference to another schema
    required: true,
  },
});

postSchema.pre("save", function (next) {
  //set expires
  if (this.deleteAfter && this.deleteAfter > 0) {
    this._ttl = this.deleteAfter * 3600; //expire docs after a number of hours
  }
  next();
});

postSchema.index({ createdAt: 1 }, { expireAfterSeconds: "_ttl" }); //index and conduct expire after seconds

postSchema.methods.addLike = async function () {
  if (this.likes.includes(userId)) {
    return;
  }

  this.likes.push(userId);

  await this.save(); //save to database
};

postSchema.methods.removeLike = async function () {
  if (!this.likes.includes(userId)) {
    return;
  }

  const index = this.likes.indexOf(userId);
  this.likes.splice(index, 1);

  await this.save();
};

postSchema.methods.editPost = async function (newContent) {
  this.content = newContent;

  await this.save();
};

postSchema.methods.addComment = async function (comment) {
  this.comments.push(comment);

  await this.save();
};

postSchema.methods.retrieveImages = function (postId) {
  // retrieve all images belong to this post
  // for all files in the uploads / {postId} folder
  const fs = require("fs");
  const path = require("path");

  // check path exists
  if (!fs.existsSync("public/uploads/" + this.postId)) {
    return [];
  }

  const files = fs.readdirSync("public/uploads/" + this.postId);

  const filesList = [];

  files.forEach((file) => {
    const filePath = path.join(`./public/uploads/${this.postId}`, file);
    if (fs.statSync(filePath).isDirectory()) {
      // sub folder
      getAllFiles(filePath, filesList);
    } else {
      filesList.push(filePath);
    }
  });

  return filesList;
};

postSchema.methods.deletePost = async function () {
  try {
    // Delete the post from the database
    await this.remove();
    console.log(`Post with ID ${this.postId} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting post:", error.message);
  }
};

module.exports = mongoose.model("Post", postSchema);
//to the collection named "posts"
