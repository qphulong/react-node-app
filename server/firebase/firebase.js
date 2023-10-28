const admin = require("firebase-admin");

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert("account.json"),
  storageBucket: "onlyme-9ca13.appspot.com",
});
// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
