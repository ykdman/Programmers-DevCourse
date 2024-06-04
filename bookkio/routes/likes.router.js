const express = require("express");
const { checkAuth } = require("../utils/auth.js");
const router = express.Router();

const { addLike, deleteLike } = require("../controller/likes.controller.js");

router.use(checkAuth);
router.post("/:bookId", addLike);
router.delete("/:bookId", deleteLike);

module.exports = router;
