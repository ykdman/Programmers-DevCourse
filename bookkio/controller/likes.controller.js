const { verify } = require("jsonwebtoken");
const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();

/**
 * 좋아요 추가 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const addLike = (req, res) => {
  const { bookId } = req.params;
  const { token } = req;
  // let userJwt = req.headers.authorization;
  // console.log("receiver JWT : ", userJwt);

  // let verifiedJwt = verify(userJwt, process.env.PRIVATE_KEY);
  // console.log(verifiedJwt);
  const queryArg = [+token.id, +bookId];

  let sqlQuery = `
  SELECT * FROM likes
  WHERE user_id = ? AND book_id = ?;
  `;

  dbConnection.query(sqlQuery, queryArg, (err, result) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (result.length === 0) {
      sqlQuery = `
        INSERT INTO likes (user_id, book_id)
        VALUES (?, ?);
        `;
      dbConnection.query(sqlQuery, queryArg, (err, result) => {
        if (err) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "잘못된 요청정보 입니다." });
        }

        return res.status(StatusCodes.OK).json(result.affectedRows);
      });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "이미 좋아요를 눌렀습니다." });
    }
  });
};

/**
 * 좋아용 제거 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const deleteLike = (req, res) => {
  const { token } = req;
  const { bookId } = req.params;
  let sqlQuery = `
    DELETE FROM likes
    WHERE user_id=? AND book_id=?;
  `;
  dbConnection.query(sqlQuery, [+token.id, +bookId], (err, result) => {
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
