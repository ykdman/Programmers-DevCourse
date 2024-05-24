const express = require("express");
const {
  searchBooks,
  searchOneBook,
  getNewBooks,
} = require("../controller/books.controller");
const router = express.Router();

router.get("/", searchBooks);
router.get("/new", getNewBooks);
router.get("/:bookId", searchOneBook);

module.exports = router;
