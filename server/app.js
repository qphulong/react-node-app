const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");

const postRoute = require("./routes/post");
const postFunctions = require("./functions/post");
const userRoute = require("./routes/user");
const storageRoute = require("./routes/storage");

var app = express();
app.use("/public", express.static("public")); //static folder for public

app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3001;

const uri = process.env.DB_URI; //get uri from env (for secure reasons)
mongoose.connect(uri).then(() => console.log("Connected to db"));

const isProd = process.env.PROD === "true" || false;
window.backendURL = isProd ? process.env.PROD_URL : "http://localhost:3001";

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.messsage}`);
});

app.set("view engine", "ejs"); //set view engine for ejs file

app.use(bodyParser.json()); //middleware to interpret json

app.use("/posts", postRoute); //route for posts
postFunctions.run(); //run change watch for mongodb

app.use("/user", userRoute); //for route user

app.use("/storage", storageRoute); //storage route

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
//long

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
