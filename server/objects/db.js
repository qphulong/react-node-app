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

  con.query("create database if not exists main", function (err, result) {
    if (err) throw err;
    console.log("Database created"); //create database

    con.query("create table if not exists users", function (err, result) {
      if (err) throw err;
      console.log("Table users created"); //create users database
    });
  });
});

exports.createDb = () => {};
