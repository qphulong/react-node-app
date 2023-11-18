const storage = require("../firebase/storage");
const storageFunctions = require("../functions/storage");
const multer = require("multer");
const Post = require("../models/post");

const upload = multer({
  storage: multer.memoryStorage(),
});

exports.uploadImages = async (req, res) => {
  if (!req.files) {
    return res.status(400).send("Error: No Image found");
  }

  const files = req.files;
  const uploadPromises = [];

  for (const file of files) {
    const blob = storage.bucket.file(postId + "/" + req.file.originalname);

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

    uploadPromises.push(
      new Promise((resolve, reject) => {
        blobWriter.on("finish", () => {
          // Get the URL of the uploaded file
          blob
            .getSignedUrl({
              action: "read",
              expires: "03-09-2491",
            })
            .then((signedUrls) => {
              // signedUrls[0] contains the file's public URL
              resolve(signedUrls[0]);
            });
        });
        blobWriter.on("error", reject);
      })
    );
  }

  Promise.all(uploadPromises)
    .then((imageUrls) => {
      // imageUrls is an array of URLs of the uploaded images
      Post.updateOne(
        { _id: postId },
        { $push: { images: { $each: imageUrls } } }
      ); //add to the array field all image URLs

      res.status(200).send("All Images uploaded successfully.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error uploading Images.");
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
