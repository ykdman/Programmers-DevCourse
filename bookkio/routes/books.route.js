const express = require("express");
const {
  searchBooks,
  searchOneBook,
} = require("../controller/books.controller");
const router = express.Router();

router.get("/", searchBooks);
router.get("/:bookId", searchOneBook);

module.exports = router;
