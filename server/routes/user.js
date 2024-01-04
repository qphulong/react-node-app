const express = require("express");
const userController = require("../controllers/user");
const moderatorController = require("../controllers/moderator");
const adminController = require("../controllers/admin");

const Post = require("../models/post");
const User = require("../models/user");

const { query } = require("express-validator");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

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

router.delete(
  "/moderator",
  query("postId").notEmpty(),
  moderatorController.deletePost
);

router.get("/moderator", (req, res) => {
  moderatorController.working; //start working
});

//keep button (keep a post)
router.put("/moderator/keep", (req, res) => {
  res.status(200).send("Keep function executed");
});

//remove button (remove a violating post)
router.put("/moderator/remove", moderatorController.deletePost);

//admin show all users
router.get("/admin", adminController.showAllUsers);

//assign moderator
router.put("/admin/assign", adminController.assignModerator);

//unassign moderator
router.put("/admin/unassign", adminController.unassignModerator);

router.post("/add-friends", userController.friendLink);

router.put("/add-friends/:linkId", userController.acceptFriendLink);

router.put("/social-media", userController.addSocialMedia);

router.get("/social-media/:userId", userController.getSocialMedia);

router.put("/likes", userController.modifyLikes);

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  // check friends, if not friend then not show
  User.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // find all posts of the user with matching userId
      Post.find({ user: user })
        .select("user.userId content postId createdAt") // Only select the userId field
        .then((posts) => {
          res.json({ user: user.userId, posts: posts });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
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

  const userId = req.params.userId;
  const folderPath = path.join(`./public/profile_pics/${userId}`);

  // Check if the folder already contains a profile pic
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading folder.");
    }

    // Remove existing profile pic if found
    if (files.length > 1) {
      const existingProfilePic = path.join(folderPath, files[0]);
      fs.unlink(existingProfilePic, (err) => {
        if (err) {
          return res.status(500).send("Error deleting existing profile pic.");
        }
      });
    }

    // Remove the leading ".." from the beginning of the path
    const savedPath = `public/profile_pics/${userId}/${uploadedFile[0].filename}`;

    // Save the new profile pic
    const user = User.findOne({ userId: userId })
      .then((user) => {
        if (!user) {
          return res.status(400).send("User not found.");
        }

        user.profilePic = `http://localhost:3001/${savedPath}`;
        user.save();
      })
      .catch((err) => console.log(err));

    res.send("Image uploaded successfully!");
  });
});

router.get("/profile-pic/:userId", (req, res) => {
  const userId = req.params.userId;
  const folderPath = path.join(`./public/profile_pics/${userId}`);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(404).send("No files found.");
    }

    res.send(files);
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

module.exports = router;
