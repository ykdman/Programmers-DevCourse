const dbConnection = require("../model/mysql.js");

/**
 * 회원가입 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const userJoin = (req, res, next) => {
  const { email, password, username } = req.body;
  let querySql = `
    SELECT * FROM users
    WHERE email = ?
  `;
  dbConnection.query(querySql, email, (err, result) => {
    if (err) {
      // Query Error
      return res.json(err.message);
    }

    if (!result[0]) {
      // no rows => 200
      querySql = `INSERT INTO users 
      (email, username, password) 
      VALUES 
      (?, ? ,?)`;
      dbConnection.query(
        querySql,
        [email, username, password],
        (err, result) => {
          if (err) {
            return res.json(err);
          }
          return res.status(200).json({
            email,
            password,
            username,
            message: "회원가입 완료",
          });
        }
      );
    } else {
      res.status(400).json({ email, message: "이미 가입된 회원입니다." });
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
  return res.status(200).json({ message: "로그인 API" });
};

/**
 * 비밀번호 초기화 요청 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const applyResetPassword = (req, res, next) => {
  const { email } = req.body;
  return res.status(200).json({ message: `${email} 로 비밀번호 초기화 요청` });
};

/**
 * 비밀번호 수정 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const acceptResetPassword = (req, res, next) => {
  const { password } = req.body;
  return res.status(201).json({ message: "비밀번호 변경 완료" });
};

module.exports = {
  userJoin,
  userLogin,
  applyResetPassword,
  acceptResetPassword,
};
