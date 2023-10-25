const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //ref: "User", reference to another schema
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
