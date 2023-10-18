const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const postRoute = require("./routes/post");

dotenv.config();

const uri = process.env.DB_URI; //lấy từ file uri
mongoose.connect(uri).then(() => console.log("Connected to db"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.messsage}`);
});

app.use(bodyParser.json()); //middleware to interpret json
app.use("/", postRoute);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const incomingRouter = require("./routes/incoming");
app.use("/current-profile", incomingRouter); //retrieve current username

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
//long
