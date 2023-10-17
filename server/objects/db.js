const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectToDB = () => {
  const uri = process.env.DB_URI; //lấy từ file uri
  mongoose.connect(uri).then(() => console.log("Connected to db"));

  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.messsage}`);
  });
};

module.exports = {
  connectToDB,
};
