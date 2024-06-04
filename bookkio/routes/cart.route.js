const express = require("express");
const {
  addItemToCart,
  getAllCartItems,
  decreaseCartItem,
  removeCartItem,
} = require("../controller/cart.controller");
const { checkAuth } = require("../utils/auth");
const router = express.Router();

router.use(checkAuth);
router
  .route("/")
  .post(addItemToCart)
  .get(getAllCartItems)
  .delete(removeCartItem);
router.post("/decrease", decreaseCartItem);

module.exports = router;
