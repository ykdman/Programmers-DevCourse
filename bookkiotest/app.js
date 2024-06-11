const express = require("express");
const app = express();

// env 설정
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listen ${PORT}`);
});
