const dotenv = require("dotenv");
const mysql = require("mysql2");

exports.connectDb = () => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");

    con.query("create table if not exists users", function (err, result) {
      if (err) throw err;
      console.log("Table users created"); //create users database
    });
  });
};
