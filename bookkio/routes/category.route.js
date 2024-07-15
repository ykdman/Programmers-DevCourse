const express = require("express");
const { getCategories } = require("../controller/category.contorller");

const router = express.Router();

router.get("/", getCategories);

module.exports = router;
