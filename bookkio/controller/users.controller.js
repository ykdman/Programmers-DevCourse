/**
 * 회원가입 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const userJoin = (req, res, next) => {
  return res.status(200).json({ message: "회원가입 API" });
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
