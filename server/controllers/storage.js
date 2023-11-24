const storage = require("../firebase/storage");
const storageFunctions = require("../functions/storage");
const multer = require("multer");
const Post = require("../models/post");

const upload = multer({
  storage: multer.memoryStorage(),
});

exports.uploadImages = async (req, res) => {
  try {
    const postId = req.body.postId; // Assuming postId is sent in the request body
    if (!req.files || !postId) {
      return res.status(400).send("Error: No Image found or missing postId");
    }

    const files = req.files;

    const uploadPromises = Object.values(files).map(async (file) => {
      const blob = storage.bucket.file(postId + "/" + file.originalname);
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobWriter.on("error", (err) => {
        console.error(err);
        throw err;
      });

      await blobWriter.on("finish", async () => {
        const signedUrls = await blob.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });
        return signedUrls[0];
      });

      blobWriter.end(file.buffer);
    });

    const imageUrls = await Promise.all(uploadPromises);

    await Post.updateOne(
      { _id: postId },
      { $push: { images: { $each: imageUrls } } }
    );

    res.status(200).send("All Images uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading Images.");
  }
};

exports.retrieveImages = (req, res) => {
  const postId = req.body.postId; // Assuming postId is sent in the request body

  if (!postId) {
    return res.status(400).send("Missing postId");
  }

  storageFunctions
    .getDownloadUrls(postId)
    .then((downloadUrls) => {
      console.log("Download URLs:", downloadUrls);
      res.status(200).json({ downloadUrls }); // Sending downloadUrls as a response
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Error retrieving images.");
    });
};
