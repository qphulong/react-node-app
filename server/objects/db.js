const dotenv = require("dotenv");
const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});
