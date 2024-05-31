const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");

// const createQueryFormat = (query, queryArgument) => {
//   let format;
//   format = dbConnection.format(query, queryArgument);
//   return format;
// };

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

  // delivery INSERT query
  let sqlQuery1 = `
  INSERT INTO delivery (address, receiver, contact)
  VALUES (?,?,?);
  `;
  const queryArg1 = [delivery.address, delivery.receiver, delivery.contact];
  const format1 = dbConnection.format(sqlQuery1, queryArg1);

  console.log("포맷 1");
  console.log(format1);

  // oreders INSERT query
  let sqlQuery2 = `
  INSERT INTO orders (book_title, total_price, total_qty, user_id, delivery_id)
  VALUES((SELECT title FROM books WHERE id = ?),?,?,?,(SELECT MAX(id) FROM delivery));
  `;
  const queryArg2 = [items[0].bookId, totalPrice, totalQty, userId];

  const format2 = dbConnection.format(sqlQuery2, queryArg2);
  console.log("포맷 2");
  console.log(format2);

  // orderedBook INSERT query
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

  // cartItem DELETE query
  let sqlQuery4 = `
    DELETE FROM cartitems
    WHERE id=?;
  `;

  let format4 = "";

  items.forEach((item) => {
    format4 += dbConnection.format(sqlQuery4, item.cartItemId);
  });

  console.log("포맷 4");
  console.log(format4);

  dbConnection.query(format1 + format2 + format3 + format4, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (
      result[0].affectedRows > 0 &&
      result[1].affectedRows > 0 &&
      result[2].affectedRows > 0 &&
      result[3].affectedRows > 0
    ) {
      return res.status(StatusCodes.OK).json({
        deliveryResult: result[0],
        ordersResult: result[1],
        orderedBookResult: result[2],
        deleteCartItemResult: result[3],
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
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const getOrderList = (req, res) => {
  const { userId } = req.body;

  let sqlQuery = `
  SELECT orders.id AS order_id,
  orders.book_title AS order_book_title,
  orders.total_qty AS order_total_qty,
  orders.total_price AS order_total_price,
  orders.created_at,
  orders.user_id,
  orders.delivery_id,
  delivery.address AS delivery_address,
  delivery.receiver AS delivery_receiver,
  delivery.contact AS delivery_contact
  FROM orders LEFT 
  JOIN delivery ON delivery.id = orders.delivery_id
  WHERE orders.id = ?;
  `;
  let queryArg = [+userId];

  dbConnection.query(sqlQuery, queryArg, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "잘못된 주문 목록 조회 요청입니다.", error: err });
    }

    const userOrders = result[0];
    console.log(userOrders);
    if (userOrders) {
      const resultJson = {
        orderId: userOrders.order_id,
        created_at: userOrders.created_at,
        delivery: {
          address: userOrders.delivery_address,
          receiver: userOrders.delivery_receiver,
          contact: userOrders.delivery_contact,
        },
        totalPrice: userOrders.order_total_price,
        bookTitle: userOrders.order_book_title,
        totalQty: userOrders.order_total_price,
      };
      return res.status(StatusCodes.OK).json(resultJson);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "주문한 목록이 없습니다." });
    }
  });
};

/**
 * 주문 상품 상세 조회 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const getOrderDetail = (req, res) => {
  const { orderId } = req.params;
  let sqlQuery = `
  SELECT books.id AS book_id,
  books.price AS book_price,
  books.title AS book_title,
  books.author AS book_author,
  orderedbook.qty AS order_qty
  FROM orderedBook LEFT 
  JOIN books ON books.id = orderedbook.book_id
  WHERE orderedbook.order_id = ?;
  `;
  let queryArg = [+orderId];

  const format = dbConnection.format(sqlQuery, queryArg);

  dbConnection.query(format, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const orderDetails = [...results];
    console.log(orderDetails);

    if (orderDetails.length > 0) {
      const resultJson = orderDetails.map((item) => {
        return {
          bookId: item.book_id,
          bookTitle: item.book_title,
          author: item.book_author,
          price: item.book_price,
          qty: item.order_qty,
        };
      });
      return res.status(StatusCodes.OK).json(resultJson);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "해당하는 주문을 찾지 못했습니다." });
    }
  });
};

module.exports = {
  orderItems,
  getOrderList,
  getOrderDetail,
};
