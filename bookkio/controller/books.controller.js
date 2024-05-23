const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");

/**
 * 전체 도서 조회 Or 카테고리별 도서 조회
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const searchBooks = (req, res, next) => {
  const { category_id } = req.query;

  //카테고리 검색
  if (category_id) {
    let sqlQuery = `
    SELECT * FROM books LEFT 
    JOIN category ON books.category_id = category.id
    WHERE books.category_id = ?
    `;

    dbConnection.query(sqlQuery, [+category_id], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST);
      }

      if (results.length > 0) {
        return res.status(StatusCodes.OK).json(results);
      } else {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
    });
  } else {
    // 전체 도서 조회
    let sqlQuery = `SELECT * FROM books`;
    dbConnection.query(sqlQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results[0]) {
        const books = results.map((book) => {
          const resultBook = {
            id: book.id,
            title: book.title,
            summary: book.summary,
            author: book.author,
            price: book.price,
            pub_date: book.pub_date,
          };
          return resultBook;
        });
        return res.status(StatusCodes.OK).json(books);
      }
    });
  }
};

/**
 * 개별 도서 조회 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const searchOneBook = (req, res, next) => {
  const { bookId } = req.params;
  let sqlQuery = `
    SELECT * FROM books
    WHERE id=?
  `;
  dbConnection.query(sqlQuery, [+bookId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const book = results[0];
    if (book) {
      return res.status(StatusCodes.OK).json(book);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

const searchBookByCategory = (req, res, next) => {
  const { category_id } = req.query;
  let sqlQuery = `SELECT * FROM books WHERE category_id=?`;

  dbConnection.query(sqlQuery, +category_id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST);
    }

    if (results.length > 0) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = {
  searchBooks,
  searchOneBook,
};
