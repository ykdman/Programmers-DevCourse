const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");

/**
 * 주문하기 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const orderItems = (req, res) => {
  const { items, delivery, totalPrice, totalQty, userId } = req.body;
  console.log({
    items,
    delivery,
    totalPrice,
    totalQty,
    userId,
  });

  let sqlQuery1 = `
  INSERT INTO delivery (address, receiver, contact)
  VALUES (?,?,?);
  `;
  const queryArg1 = [delivery.address, delivery.receiver, delivery.contact];
  const format1 = dbConnection.format(sqlQuery1, queryArg1);

  console.log("포맷 1");
  console.log(format1);

  let sqlQuery2 = `
  INSERT INTO orders (book_title, total_price, total_qty, user_id, delivery_id)
  VALUES((SELECT title FROM books WHERE id = ?),?,?,?,(SELECT MAX(id) FROM delivery));
  `;
  const queryArg2 = [items[0].bookId, totalPrice, totalQty, userId];

  const format2 = dbConnection.format(sqlQuery2, queryArg2);
  console.log("포맷 2");
  console.log(format2);

  let sqlQuery3 = `
    INSERT INTO orderedbook (order_id, book_id, qty)
    VALUES((SELECT MAX(id) FROM orders), ?, ?);
  `;
  let format3 = "";

  items.forEach((item) => {
    format3 += dbConnection.format(sqlQuery3, [item.bookId, item.qty]);
  });
  console.log("포맷 3");
  console.log(format3);

  dbConnection.query(format1 + format2 + format3, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (
      result[0].affectedRows > 0 &&
      result[1].affectedRows > 0 &&
      result[2].affectedRows > 0
    ) {
      return res.status(StatusCodes.OK).json({
        deliveryResult: result[0],
        ordersResult: result[1],
        orderedBookResult: result[2],
      });
    } else {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "오류가 발생하였습니다." });
    }
  });
};

/**
 * 전체 주문 목록 조회 API
 * @param {import("express").Request}} req
 * @param {import("express").Response} res
 * @returns
 */
const getOrderList = (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json({ message: "전체 주문 목록 조회 API" });
};

/**
 * 주문 상품 상세 조회 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const getOrderDetail = (req, res) => {
  const { orderId } = req.params;
  return res.status(StatusCodes.OK).json({ orderId });
};

module.exports = {
  orderItems,
  getOrderList,
  getOrderDetail,
};
