const express = require("express");
const {
  addItemToCart,
  getAllCartItems,
} = require("../controller/cart.controller");
const router = express.Router();

router.post("/", addItemToCart);
router.get("/", getAllCartItems);

module.exports = router;
