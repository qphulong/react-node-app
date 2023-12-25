const express = require("express");
const userController = require("../controllers/user");
const moderatorController = require("../controllers/moderator");
const adminController = require("../controllers/admin");

const Post = require("../models/post");
const User = require("../models/user");

const { query } = require("express-validator");
const { currentUser } = require("../app");

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

router.put(
  "/friends",
  query("userId").notEmpty(), //call this validation middleware first to validate
  query("friendId").notEmpty(),
  userController.addFriend
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

router.put("/add-friends", userController.acceptFriendLink);

router.put("/social-media", userController.addSocialMedia);

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  // check friends, if not friend then not show
  if (currentUser.userId == userId || currentUser.friends.includes(userId)) {
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
  } else {
    res.status(403).send("You are not friends with this user");
  }
});

module.exports = router;
