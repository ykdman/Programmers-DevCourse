const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "bookkio",
});

module.exports = connection;
