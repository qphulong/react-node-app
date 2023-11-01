const storage = require("../firebase/storage");

const bucket = storage.bucket;

exports.getDownloadUrls = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [files] = await bucket.getFiles({
        prefix: postId,
      });

      const downloadUrls = [];

      for (const file of files) {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 60 * 5000, // Link expires in 5 minute
        });

        downloadUrls.push({
          name: file.name,
          downloadUrl: url,
        });
      }

      resolve(downloadUrls);
    } catch (error) {
      reject(error);
    }
  });
};
