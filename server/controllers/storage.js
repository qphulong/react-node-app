const storage = require("../firebase/storage");
const storageFunctions = require("../functions/storage");

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

exports.uploadImage = (req, res) => {
  if (!req.files) {
    return res.status(400).send("Error: No Image found");
  }

  const files = req.files;
  const uploadPromises = [];

  for (const file of files) {
    const blob = storage.bucket.file(file.originalname);
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      console.log(err); // error uploading image
      return Promise.reject(err);
    });

    blobWriter.on("finish", () => {
      console.log(`${file.originalname} uploaded successfully`);
    });

    blobWriter.end(file.buffer);

    uploadPromises.push(new Promise((resolve, reject) => {
      blobWriter.on("finish", resolve);
      blobWriter.on("error", reject);
    }));
  }

  Promise.all(uploadPromises)
    .then(() => {
      res.status(200).send("All files uploaded successfully.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error uploading files.");
    });
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
