const express = require("express");
const {
  searchBooks,
  searchOneBook,
  getNewBooks,
} = require("../controller/books.controller");
const { checkAuth } = require("../utils/auth");

const router = express.Router();
// router.use(checkAuth);
router.get("/", searchBooks);
router.get("/new", getNewBooks);
router.get("/:bookId", searchOneBook);

module.exports = router;
