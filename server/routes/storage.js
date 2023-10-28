const storageController = require("../controllers/storage");
const express = require("express");

const router = express.Router;

router.post("/upload", storageController.uploadFile);

module.exports = router;
