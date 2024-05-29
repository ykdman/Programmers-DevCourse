const express = require("express");
const router = express.Router();

const {
  getOrderDetail,
  getOrderList,
  orderItems,
} = require("../controller/orders.controller.js");

// 주문하기 API
router.post("/", orderItems);

// 주문 목록조회  API
router.get("/", getOrderList);
router.get("/:orderId", getOrderDetail);

module.exports = router;
