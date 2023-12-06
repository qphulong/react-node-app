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

router.post("/upload", upload.array("files", 5), (req, res) => {
  const uploadedFiles = req.files;

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  uploadedFiles.forEach((file) => {
    console.log("Uploaded file:", file.filename);
  });

  res.send("Files uploaded successfully!");
}); //upload image

router.use("/upload", express.static("uploads"));

module.exports = router;
