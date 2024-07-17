const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getCategories = (req, res) => {
  const queryString = `SELECT * FROM category;`;
  dbConnection.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST);
    }

    if (results.length > 0) {
      return res
        .status(StatusCodes.OK)
        .json(
          results.map((category) => ({
            id: category["category_id"],
            name: category["category_name"],
          }))
        );
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = {
  getCategories,
};
