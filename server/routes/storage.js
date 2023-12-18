const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// upload images for the post
const upload = multer({
  array: "images", // field array of images when passing through the API
});

router.post("/upload/:postId", upload.array("images", 5), (req, res) => {
  const postId = req.params.postId; // Assuming postId is passed in the URL

  const uploadedFiles = req.files;

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  uploadedFiles.forEach((file) => {
    console.log("Uploaded file:", file.filename);

    // Construct the new path with postId in the folder name
    const folderPath = path.join(__dirname, "..", "uploads", `${postId}`);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Get the old path of the uploaded file
    const oldPath = path.join(__dirname, "..", file.path);

    // Get the new path with the correct extension and postId
    const newFileNameWithExt = `${file.filename}${path.extname(
      file.originalname
    )}`;
    const newPath = path.join(folderPath, newFileNameWithExt);

    // Rename the file with the correct extension and postId
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Error renaming file:", err);
      }
    });
  });

  res.send("Files uploaded successfully!");
});

router.use("/upload", express.static("uploads"));

module.exports = router;
