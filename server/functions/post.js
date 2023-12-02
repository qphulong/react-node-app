const Post = require("../models/post");
const Comment = require("../models/comment");

const MAX_LETTERS_LIMIT = 900;
const MAX_IMAGES_PER_POST = 5;

//find a specific posst and a like to it
async function addLike(postId) {
  try {
    const post = await Post.findOne({ postId });
    if (post) {
      //if post is not null
      await post.addLike();
      console.log(`Like added to post with ID: ${postId}`);
    } else {
      console.log(`Post with ID ${postId} not found.`);
    }
  } catch (error) {
    console.error("Error adding like:", error);
  }
}

exports.checkPostLimit = (postContent = null, images = null) => {
  try {
    // Check letter limit
    if (postContent != null && postContent.length > MAX_LETTERS_LIMIT) {
      throw new Error(
        `Post content exceeds the maximum limit of ${MAX_LETTERS_LIMIT} characters.`
      );
    }

    // Check images limit
    if (images != null && images.length > MAX_IMAGES_LIMIT) {
      throw new Error(
        `Exceeded the maximum limit of ${MAX_IMAGES_LIMIT} images per post.`
      );
    }

    // If both checks pass, return true
    return true;
  } catch (error) {
    console.error("Error checking post limit:", error.message);
    return false;
  }
};

async function editPost(postId, newContent) {
  checkPostLimits(newContent);
  await Post.updateOne({ postId: postId }, { content: newContent });
}

async function deletePost(postId) {
  await Post.deleteOne({ postId: postId }); //delete post
}

async function run() {
  Post.watch().on("change", (data) => console.log("New data changed: ", data));
}

async function addComment(postId, comment) {
  try {
    const post = await Post.findOne({ postId: postId });

    if (!post) {
      throw new Error("Post not found");
    }

    const newComment = new Comment({
      content: comment,
      user: post.user,
      likes: 0,
    });

    await newComment.save(); // Save comment to database

    post.addComment(newComment); // Add comment to the post

    await post.save();
  } catch (err) {
    console.error(err);
  }
}

async function reportPost(postId) {
  try {
    const post = await Post.findOne({ postId });
    if (post) {
      //if post is not null
      const id = post._id;

      const newPostForConsideration = new PostForModeration({
        post: post,
      });
      //add to the report schema
    } else {
      console.log(`Post with ID ${postId} not found.`);
    }
  } catch (error) {
    console.error("Error adding like:", error);
  }
}

async function addImages(postId) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage: storage });

  Post.findOne({ postId: postId }, (err, post) => {
    if (err) {
      console.error(err);
    } else {
      if (req.files.length > MAX_IMAGES_PER_POST) {
        throw new Error(
          "You can only upload a maximum of " +
            MAX_IMAGES_PER_POST +
            " images per post."
        );
      }
      post.addImages(req.files.map((file) => file.path)); //add image to a buffer

      post.save((err, updatedPost) => {
        if (err) {
          console.error(err);
        } else {
          console.log("New comment added:", updatedPost);
        }
      });
    }
  });
}

module.exports = {
  addLike,
  editPost,
  deletePost,
  run,
  addComment,
  addImages,
  reportPost,
};
