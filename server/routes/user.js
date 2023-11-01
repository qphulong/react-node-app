const express = require("express");
const userController = require("../controllers/user");
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

module.exports = router;
