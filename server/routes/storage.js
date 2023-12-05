const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  array: "images", //array
  limits: {
    fileCount: 5, // Limit to 5 files
  },
});

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log(req.file);
  console.log("Uploaded file:", file.filename);
  res.send("File uploaded successfully!");
}); //upload image

// router.post("/download", storageController.retrieveImages);

module.exports = router;
