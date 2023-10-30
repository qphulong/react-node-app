const storage = require("../firebase/storage");

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send("Error: No files found");
  }

  const blob = storage.bucket.file(req.file.originalname);

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
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

const retrieveImages = (req, res) => {};
