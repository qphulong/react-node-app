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
        .select("user.userId content postId time") // Only select the userId field
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
    const folderPath = path.join(`../profile_pics/${userId}`);

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

router.post("/profile-pic/:userId", upload.single("image"), (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).send("No files were uploaded.");
  }

  res.send("File uploaded successfully!");
});

module.exports = router;
