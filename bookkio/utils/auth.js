const {
  verify,
  TokenExpiredError,
  JsonWebTokenError,
} = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

var dotenv = require("dotenv");
dotenv.config();

const KEY = process.env.PRIVATE_KEY;

function validateJSONToken(token) {
  return verify(token, KEY);
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function checkAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization && !req.baseUrl.includes("/books")) {
    console.log("NOT AUTH");
    return res.status(400).json({ message: "Not Auth" });
  } else if (!req.headers.authorization && req.baseUrl.includes("/books")) {
    return next();
  }
  console.log(req.headers.authorization);
  const authFragment = req.headers.authorization.split(" ");
  console.log(authFragment);
  const authToken = authFragment[0];
  console.log(authToken);

  try {
    const validateToken = validateJSONToken(authToken);
    console.log(validateToken);
    req.token = validateToken;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "로그인 세션이 만료 되었으니 다시 로그인해 주세요" })
        .end();
    } else if (err instanceof JsonWebTokenError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "올바르지 않은 토큰 정보 입니다." })
        .end();
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "사용자 인증에 문제가 발생했습니다." });
  }
  next();
}

// token에서 id 값 빼내기
function getIdFromToken(req) {
  const { token } = req;
  const { id } = token;
  return +id;
}

exports.checkAuth = checkAuth;
exports.extractId = getIdFromToken;
