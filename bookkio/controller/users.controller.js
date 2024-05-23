const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**
 * 회원가입 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const userJoin = (req, res, next) => {
  const { email, password, username } = req.body;

  // crypt password
  const salt = crypto.randomBytes(10).toString("base64");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  let sqlQuery = `
    SELECT * FROM users
    WHERE email = ?
  `;
  dbConnection.query(sqlQuery, email, (err, result) => {
    if (err) {
      // Query Error
      return res
        .status(StatusCodes.SERVICE_UNAVAILABLE)
        .json(err.message)
        .end();
    }

    if (!result[0]) {
      // no rows => 200
      sqlQuery = `INSERT INTO users 
      (email, username, password, salt) 
      VALUES 
      (?, ?, ?, ?)`;
      dbConnection.query(
        sqlQuery,
        [email, username, hashedPassword, salt],
        (err, result) => {
          if (err) {
            return res.json(err);
          }
          return res.status(StatusCodes.CREATED).json({
            email,
            password,
            username,
            message: "회원가입 완료",
          });
        }
      );
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ email, message: "이미 가입된 회원입니다." });
    }
  });
};

/**
 * 로그인 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  let sqlQuery = `
    SELECT * FROM users
    WHERE email = ?
  `;
  // email 존재 확인
  dbConnection.query(sqlQuery, email, (err, result) => {
    if (err) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE);
    }

    const existUser = result[0];
    // 입력 비밀번호 를 DB salt 기반 암호화 하여 비밀번호 비교
    const inputHashPassword = crypto
      .pbkdf2Sync(password, existUser.salt, 10000, 10, "sha512")
      .toString("base64");

    if (existUser && inputHashPassword === existUser.password) {
      // 로그인 성공
      const token = jwt.sign(
        {
          email: existUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "5m",
          issuer: "kdman",
        }
      );
      // token 쿠키 설정
      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.status(StatusCodes.OK).json({ message: "로그인되었습니다." });
    } else {
      // email 미 존재시, 404
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "존재하지 않는 이메일입니다." });
    }
  });
};

/**
 * 비밀번호 초기화 요청 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const requestResetPassword = (req, res, next) => {
  const { email } = req.body;
  let sqlQuery = `SELECT * FROM users WHERE email=?`;
  dbConnection.query(sqlQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const existUser = result[0];
    if (existUser) {
      return res.status(StatusCodes.OK).json({ email });
    } else {
      return res.status(StatusCodes.FORBIDDEN).end();
    }
  });
};

/**
 * 비밀번호 수정 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const acceptResetPassword = (req, res, next) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(10).toString("base64");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");
  let sqlQuery = `
    UPDATE users SET password = ?, salt = ? 
    WHERE email =?
  `;
  dbConnection.query(sqlQuery, [hashedPassword, salt, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST);
    }

    if (result.affectedRows > 0) {
      return res.status(StatusCodes.OK).json(result[0]);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  });
};

module.exports = {
  userJoin,
  userLogin,
  requestResetPassword,
  acceptResetPassword,
};
