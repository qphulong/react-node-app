const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.put("/password", userController.changePassword);
