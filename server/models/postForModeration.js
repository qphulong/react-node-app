const mongoose = require("mongoose");

const postForModerationSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", //reference to another schema
    required: true,
  },
});

postForModerationSchema.methods.delete = async function () {
  try {
    // Delete the post from the database
    await this.remove();

    console.log(`Post with ID ${this.postId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting post:", error.message);
  }
};

module.exports = mongoose.model("PostForModeration", postForModerationSchema);
