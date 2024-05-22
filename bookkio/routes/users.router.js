const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  userJoin,
  userLogin,
  applyResetPassword,
  acceptResetPassword,
} = require("../controller/users.controller.js");

const { requestValidator } = require("../utils/validator");

// 회원가입
router.post(
  "/join",
  [
    body("email")
      .notEmpty()
      .withMessage("이메일 정보를 입력해주세요.")
      .isEmail()
      .withMessage("이메일을 올바르게 입력해주세요."),
    body("password").notEmpty().withMessage("비밀번호를 입력해주세요."),
    body("username")
      .notEmpty()
      .withMessage("사용자 이름을 입력해주세요")
      .isLength({ min: 2, max: 5 }),
    requestValidator,
  ],
  userJoin
);

// 로그인
router.post("/login", userLogin);

// 비밀번호 초기화 요청
router.post("/reset", applyResetPassword);

// 비밀번호 초기화
router.put("/reset", acceptResetPassword);

module.exports = router;
