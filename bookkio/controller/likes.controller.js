const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");

/**
 * 좋아요 추가 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const addLike = (req, res) => {
  const { userId } = req.body;
  const { bookId } = req.params;

  let sqlQuery = `
  INSERT INTO likes (user_id, book_id)
  VALUES (?, ?);
  `;

  dbConnection.query(sqlQuery, [+userId, +bookId], (err, result) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "잘못된 요청정보 입니다." });
    }

    return res.status(StatusCodes.OK).json(result.affectedRows);
  });
};

/**
 * 좋아용 제거 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const deleteLike = (req, res) => {
  const { userId } = req.body;
  const { bookId } = req.params;

  let sqlQuery = `
    DELETE FROM likes
    WHERE user_id=? AND book_id=?;
  `;
  dbConnection.query(sqlQuery, [+userId, +bookId], (err, result) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "올바르지 않은 요청 입니다." });
    }

    return res.status(StatusCodes.OK).json(result.affectedRows);
  });
};

module.exports = {
  addLike,
  deleteLike,
};
