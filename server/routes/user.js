const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/sign-up", userController.signUp);

router.post("/sign-in", userController.signIn);

router.post("/friend", userController.addFriend);

router.put("/password", userController.changePassword);

module.exports = router;
