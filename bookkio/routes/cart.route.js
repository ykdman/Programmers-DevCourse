const express = require("express");
const {
  addItemToCart,
  getAllCartItems,
  decreaseCartItem,
  removeCartItem,
} = require("../controller/cart.controller");
const router = express.Router();

router
  .route("/")
  .post(addItemToCart)
  .get(getAllCartItems)
  .delete(removeCartItem);
router.post("/decrease", decreaseCartItem);

module.exports = router;
