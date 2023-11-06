const storage = require("../firebase/storage");
const storageFunctions = require("../functions/storage");

exports.uploadFile = (req, res) => {};

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
