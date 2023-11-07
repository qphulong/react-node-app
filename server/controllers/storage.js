const storage = require("../firebase/storage");
const storageFunctions = require("../functions/storage");

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send("Error: No files found");
  }

  const blob = storage.bucket.file(req.file.originalname);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype, //image
    },
  });
  blobWriter.on("error", (err) => {
    console.log(err); //error uploading file
  });
  blobWriter.on("finish", () => {
    res.status(200).send("File uploaded.");
  });
  blobWriter.end(req.file.buffer);
};

exports.retrieveImages = (req, res) => {
  const postId = req.postId;

  storageFunctions
    .getDownloadUrls(postId)
    .then((downloadUrls) => {
      console.log("Download URLs:", downloadUrls);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
