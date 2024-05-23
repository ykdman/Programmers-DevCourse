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

const getCategory = (category_id) => {
  let sqlQuery = category_id
    ? `SELECT * FROM category WHERE id=${+category_id}`
    : `SELECT * FROM category`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return err;
    }

    if (results.length > 0) {
      return results;
    } else {
      return [];
    }
  });
};

module.exports = connection;
