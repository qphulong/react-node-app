const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const postId = req.params.postId;
    const folderPath = path.join(`./public/uploads/${postId}`);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keeping the original file name
  },
});

const upload = multer({ storage: storage });

// POST endpoint for uploading files
router.post("/upload/:postId", upload.array("images", 5), (req, res) => {
  const uploadedFiles = req.files;

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // check if folder has more than 5 files
  const postId = req.params.postId;
  const folderPath = path.join(`./public/uploads/${postId}`);
  const files = fs.readdirSync(folderPath);
  if (files.length > 5) {
    return res.status(400).send("Maximum 5 files allowed.");
  }

  console.log(req.files);

  res.send("Files uploaded successfully!");
});

router.use("/upload", express.static("uploads"));

module.exports = router;
