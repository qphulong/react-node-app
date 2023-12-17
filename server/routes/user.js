const express = require("express");
const userController = require("../controllers/user");
const moderatorController = require("../controllers/moderator");
const adminController = require("../controllers/admin");
const { query } = require("express-validator");

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
  query("password").notEmpty(),
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

router.put("/add-friends", userController.friendLink);

router.post("/add-friends", userController.acceptFriendLink);

router.put("/social-media", userController.addSocialMedia);

module.exports = router;
