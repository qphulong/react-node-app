const storageController = require("../controllers/storage");
const express = require("express");

const router = express.Router();

router.post("/upload", storageController.uploadFile);

router.post("/download", storageController.retrieveImages);

module.exports = router;
