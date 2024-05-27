const express = require("express");

const router = express.Router();

const { addLike, deleteLike } = require("../controller/likes.controller.js");

router.post("/:bookId", addLike);
router.delete("/:bookId", deleteLike);

module.exports = router;
