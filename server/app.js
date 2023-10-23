const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const postRoute = require("./routes/post");
const postFunctions = require("./functions/post");

dotenv.config();

const uri = process.env.DB_URI; //get uri from env (for secure reasons)
mongoose.connect(uri).then(() => console.log("Connected to db"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.messsage}`);
});

app.set("view engine", "ejs"); //set view engine for ejs file

app.use(bodyParser.json()); //middleware to interpret json
app.use("/posts", postRoute); //route for posts

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const incomingRouter = require("./routes/incoming");
const post = require("./models/post");
app.use("/current-profile", incomingRouter); //retrieve current username

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
//long

postFunctions.run(); //run change watch for mongodb
