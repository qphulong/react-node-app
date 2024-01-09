const express = require("express");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");

const Post = require("../models/post");
const User = require("../models/user");
const PostForModeration = require("../models/postForModeration");

const { query } = require("express-validator");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/admin", async (req, res) => {
  // get all users
  const users = await User.find({});

  // retrieve document fields

  const userIds = [];

  for (const user of users) {
    userIds.push(user.userId);
  }

  return res.json({ users: userIds });
});

router.get("/:userId/admin", async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  console.log(user);

  return res.json({ isAdmin: user.isAdmin });
});

router.get("/:userId/moderator", async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  console.log(user);

  return res.status(200).json({ isModerator: user.isContentModerator });
});

router.post(
  "/sign-up",
  query("userId").notEmpty(), //call this validation middleware first to validate
  query("password").notEmpty(),
  userController.signUp
);

router.post(
  "/sign-in",
  query("userId").notEmpty(), //call this validation middleware first to validate
  query("password").notEmpty(),
  userController.signIn
);

router.delete(
  "/friends",
  query("userId").notEmpty(), //call this validation middleware first to validate
  query("friendiD").notEmpty(),
  userController.removeFriend
);

router.put(
  "/password",
  query("userId").notEmpty(), //call this validation middleware first to validate
  query("newPassword").notEmpty(),
  query("oldPassword").notEmpty(),
  userController.changePassword
);

router.get("/moderator", async (req, res) => {
  // get all posts from the database
  console.log("working");
  const posts = await PostForModeration.find({});

  // set of postId
  const postIds = new Set();

  for (const post of posts) {
    const curentPost = await Post.findOne({ _id: post.post });
    if (!curentPost) {
      continue;
    }
    postIds.add(curentPost.postId);
  }

  console.log(postIds);

  // convert set to array
  res.json({ posts: Array.from(postIds) });
});

//keep button (keep a post)
router.put("/moderator/keep", async (req, res) => {
  const postId = req.body.postId;

  const post = await Post.findOne({ postId: postId });

  const postForModeration = await PostForModeration.findOne({ post: post });

  if (!postForModeration) {
    res.status(404).send("Post not found");
    return;
  }

  await PostForModeration.deleteOne({ post: post });

  res.send("Post kept successfully");
});

//remove button (remove a violating post)
router.put("/moderator/remove", async (req, res) => {
  const postId = req.body.postId;

  const post = await Post.findOne({ postId: postId });

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  const postForModeration = await PostForModeration.findOne({ post: post });

  if (!postForModeration) {
    res.status(404).send("Post not found");
    return;
  }

  await PostForModeration.deleteOne({ post: post });
  await Post.deleteOne({ postId: postId });

  res.send("Post removed successfully");
});

//assign moderator
router.put("/admin/assign", adminController.assignModerator);

//unassign moderator
router.put("/admin/unassign", adminController.unassignModerator);

router.post("/add-friends", userController.friendLink);

router.put("/add-friends/:linkId", userController.acceptFriendLink);

router.put("/social-media", userController.addSocialMedia);

router.put("/social-media/:userId", async (req, res) => {
  const userId = req.params.userId;
  const socialMedia = req.body.socialMedia;

  const user = await User.findOne({ userId: userId });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  for (let i = 0; i < user.otherSocialMedia.length; i++) {
    if (user.otherSocialMedia[i].link == socialMedia) {
      user.otherSocialMedia.remove(user.otherSocialMedia[i]);
    }
  }

  await user.save();

  res.json({
    socialMedia: await user.otherSocialMedia,
  });
});

router.get("/social-media/:userId", userController.getSocialMedia);

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  User.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // find all posts of the user with matching userId
      Post.find({ user: user })
        .select("user.userId content postId createdAt") // Only select the userId field
        .sort({ createdAt: -1 }) // Sort by createdAt descending
        .then((posts) => {
          res.json({ user: user.userId, posts: posts });
        })
        .catch((err) => res.status(404).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId;
    const folderPath = path.join(`./public/profile_pics/${userId}`);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keeping the original file name
  },
});

const upload = multer({ storage: storage });

router.post("/profile-pic/:userId", upload.array("image", 1), (req, res) => {
  const uploadedFile = req.files;

  if (!uploadedFile || uploadedFile.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // only allow pictures
  if (!uploadedFile[0].mimetype.startsWith("image")) {
    return res.status(400).send("Only image files are allowed.");
  }

  const userId = req.params.userId;
  const folderPath = path.join(`./public/profile_pics/${userId}`);

  // Check if the folder already contains a profile pic
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading folder.");
    }

    // Remove existing profile pic if found
    console.log(files.length);
    if (files.length > 1) {
      // file different from the one just uploaded
      const existingFile = files.filter(
        (file) => file !== uploadedFile[0].filename
      );

      for (const file of existingFile) {
        fs.unlink(path.join(folderPath, file), (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      }
    }

    // Remove the leading ".." from the beginning of the path
    const savedPath = `public/profile_pics/${userId}/${uploadedFile[0].filename}`;

    // Save the new profile pic
    const user = User.findOne({ userId: userId })
      .then((user) => {
        if (!user) {
          return res.status(400).send("User not found.");
        }

        user.profilePic = global.backendURL + `/${savedPath}`;
        user.save();

        res.status(200).send(user.profilePic);
      })
      .catch((err) => console.log(err));
  });
});

router.get("/profile-pic/:userId", async (req, res) => {
  const userId = req.params.userId;
  const folderPath = path.join(`./public/profile_pics/${userId}`);

  fs.readdir(folderPath, (err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).send("No profile pic found.");
    }
    if (err) {
      return res.status(500).send(err);
    }

    console.log(global.backendURL + `/${folderPath}/${files[0]}`);

    return res
      .status(200)
      .json({ profilePic: global.backendURL + `/${folderPath}/${files[0]}` });
  });
});

router.get("/friends/:userId", (req, res) => {
  const userId = req.params.userId;

  User.findOne({ userId: userId })
    .populate("friends", "userId") // join friends field (reference to the User schema) and select userId field (of the referenced schema)
    .exec()
    .then((user) => {
      //current user with passed userId
      if (!user) {
        // user not found
        return res.status(404).json({ message: "User not found" });
      }

      // get id values of Friends (populated above) of the current user
      const friends = user.friends.map((friend) => friend._id);

      User.find({ _id: { $in: friends } })
        .select("userId")
        .then((users) => {
          res.json({ friends: users });
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/friends/check/:userId/:friendId", async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  const friend = await User.findOne({ userId: friendId }); //find friend
  if (!friend) {
    res.status(400).send("Friend not found");
    return;
  }

  User.findOne({ userId: userId })
    .populate("friends", "userId") // join friends field (reference to the User schema) and select userId field (of the referenced schema)
    .exec()
    .then((user) => {
      //current user with passed userId
      if (!user) {
        // user not found
        return res.status(404).json({ message: "User not found" });
      }

      // get id values of Friends (populated above) of the current user
      const friends = user.friends.map((friend) => friend._id);

      User.find({ _id: { $in: friends } })
        .select("userId")
        .then((users) => {
          var isFriend = false;
          for (let i = 0; i < users.length; i++) {
            if (users[i]._id.toString() == friend._id.toString()) {
              isFriend = true;
              break;
            }
          }
          res.json({ isFriend: isFriend });
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.use("/profile-pic", express.static("uploads"));

module.exports = router;
