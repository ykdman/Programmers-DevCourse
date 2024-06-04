const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");
const { extractId } = require("../utils/auth.js");

/**
 * 장바구니에 아이템 담기 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const addItemToCart = (req, res, next) => {
  const { bookId } = req.body;
  const userId = extractId(req);

  let sqlQuery = `
    SELECT * FROM cartitems
    WHERE user_id=? AND book_id=?;
  `;
  let queryArg = [+userId, +bookId];

  dbConnection.query(sqlQuery, queryArg, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length > 0) {
      // 장바구니에 이미 있는 경우 개수 증가
      const existItem = { ...results[0], qty: results[0].qty + 1 };
      sqlQuery = `
        UPDATE cartitems
        SET qty=?
        WHERE id = ? 
      `;
      queryArg = [existItem.qty, existItem.id];

      dbConnection.query(sqlQuery, queryArg, (err, results) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }

        return res.status(StatusCodes.OK).json(existItem);
      });
    } else {
      // 장바구니에 없는 경우 => 새로 추가하는 상품
      sqlQuery = `
        INSERT INTO cartitems (book_id, user_id, qty)
        VALUES (?,?,?);
      `;
      queryArg = [+bookId, +userId, 1];

      dbConnection.query(sqlQuery, queryArg, (err, results) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }

        return res.status(StatusCodes.OK).json({ result: results });
      });
    }
  });
};

/**
 * 장바구니 전체조회 로직 => 사용자 한 명에 대하여
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getAllCartItems = (req, res, next) => {
  const userId = extractId(req);
  let sqlQuery = `
  SELECT cartitems.id AS cart_id, 
  books.price AS book_price, 
  cartitems.qty AS cart_qty, 
  cartItems.user_id AS user_id, 
  cartItems.book_id AS book_id   
  FROM cartitems LEFT 
  JOIN books ON books.id = cartitems.book_id
  WHERE cartitems.user_id = ?;
  `;
  let queryArg = [+userId];

  dbConnection.query(sqlQuery, queryArg, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

/**
 * 카트 아이템 수량 감소
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const decreaseCartItem = (req, res) => {
  const { bookId } = req.body;
  const { token } = req;
  const { id: userId } = token;

  let sqlQuery = `
  SELECT * FROM cartitems
  WHERE user_id=? AND book_id=?;  
  `;

  let queryArg = [+userId, +bookId];

  dbConnection.query(sqlQuery, queryArg, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const existItem = result[0];
    if (existItem) {
      //카트에 아이템 존재
      if (existItem.qty > 1) {
        // 수량 감소
        sqlQuery = `
        UPDATE cartitems
        SET qty = ?
        WHERE id = ?
        `;
        queryArg = [existItem.qty - 1, existItem.id];

        dbConnection.query(sqlQuery, queryArg, (err, result) => {
          if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
          }

          return res.status(StatusCodes.OK).json(result.affectedRows);
        });
      } else {
        sqlQuery = `
        DELETE FROM cartitems
        WHERE id=?
        `;
        queryArg = [existItem.id];
        dbConnection.query(sqlQuery, queryArg, (err, result) => {
          if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
          }
          return res.status(StatusCodes.OK).json(result);
        });
      }
    }
  });
};

/**
 * 장바구니 아이템 삭제 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const removeCartItem = (req, res) => {
  const { bookId } = req.body;
  const userId = extractId(req);

  let sqlQuery = `
  DELETE FROM cartitems
  WHERE user_id=? AND book_id=?;
  `;

  let queryArg = [+userId, +bookId];

  dbConnection.query(sqlQuery, queryArg, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  });
};

module.exports = {
  addItemToCart,
  getAllCartItems,
  decreaseCartItem,
  removeCartItem,
};
