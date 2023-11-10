const mongoose = require("mongoose");

const postForModerationSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", //reference to another schema
    required: true,
  },
});

module.exports = mongoose.model("PostForModeration", postForModerationSchema);
