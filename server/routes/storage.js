const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  array: "images", //array
});

router.post("/upload", upload.array("files", 5), (req, res) => {
  const uploadedFiles = req.files;

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  uploadedFiles.forEach((file) => {
    console.log("Uploaded file:", file.filename);

    // get the old path of the uploaded file
    const oldPath = path.join(__dirname, "..", file.path);

    // get the new path with the correct extension
    const newFileNameWithExt = `${file.filename}${path.extname(
      file.originalname
    )}`;
    const newPath = path.join(__dirname, "..", "uploads", newFileNameWithExt);

    // rname the file with the correct extension
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Error renaming file:", err);
      }
    });
  });

  res.send("Files uploaded successfully!");

  fs.unlink(oldPath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });
});

router.use("/upload", express.static("uploads"));

module.exports = router;
