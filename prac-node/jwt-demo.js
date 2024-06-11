const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken"); //jwt 모듈 호출

const token = jwt.sign({ foo: "bar" }, process.env.SECRET_KEY); // 토큰 생성 => jwt서명
// 페이로드, 커스텀 암호키, \

console.log(token);

const jwtResult = jwt.decode(token);
console.log(jwtResult);

const jwtResult2 = jwt.verify(token, process.env.SECRET_KEY);

console.log(jwtResult2);
