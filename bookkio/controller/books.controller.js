const dbConnection = require("../model/mysql.js");
const { StatusCodes } = require("http-status-codes");

/**
 * 전체 도서 조회 Or 카테고리별 도서 조회
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const searchBooks = (req, res, next) => {
  let { category_id, limit, currentpage: currentPage } = req.query;
  const token = req.token;

  if (!limit || !currentPage) {
    limit = !limit ? 5 : limit;
    currentPage = !currentPage ? 1 : currentPage;
  }

  const offset = +limit * (+currentPage - 1);

  //카테고리 검색
  if (category_id) {
    // let sqlQuery = token
    //   ? `
    // SELECT *, (SELECT COUNT(*) from likes WHERE book_id = books.id) AS likes FROM books LEFT
    // JOIN category ON books.category_id = category.category_id
    // WHERE books.category_id = ?
    // LIMIT ? OFFSET ?;
    // `
    //   : `
    // SELECT * FROM books LEFT
    // JOIN category ON books.category_id = category.category_id
    // WHERE books.category_id = ?
    // LIMIT ? OFFSET ?;
    // `;

    let sqlQuery = `
    SELECT *, (SELECT COUNT(*) from likes WHERE book_id = books.id) AS likes FROM books LEFT 
    JOIN category ON books.category_id = category.category_id
    WHERE books.category_id = ?
    LIMIT ? OFFSET ?;
    `;

    dbConnection.query(
      sqlQuery,
      [+category_id, +limit, offset],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(StatusCodes.BAD_REQUEST);
        }
        if (results.length > 0) {
          return res.status(StatusCodes.OK).json({
            books: [...results],
            pagination: { totalBooks: results.length, currentPage },
          });
        } else {
          return res.status(StatusCodes.NOT_FOUND).end();
        }
      }
    );
  } else {
    // 전체 도서 조회

    console.log(token);
    let sqlQuery = token
      ? `
    SELECT *, (SELECT COUNT(*) from likes WHERE book_id = books.id) AS likes FROM books
    LIMIT ? OFFSET ?
    `
      : `
    SELECT * FROM books
    LIMIT ? OFFSET ?
    `;
    dbConnection.query(sqlQuery, [+limit, offset], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results[0]) {
        // const books = results.map((book) => {
        //   const resultBook = token
        //     ? {
        //         id: book.id,
        //         img : book.img,
        //         title: book.title,
        //         summary: book.summary,
        //         author: book.author,
        //         price: book.price,
        //         pub_date: book.pub_date,
        //         likes: book.likes,
        //       }
        //     : {
        //         id: book.id,
        //         img : book.img,
        //         title: book.title,
        //         summary: book.summary,
        //         author: book.author,
        //         price: book.price,
        //         pub_date: book.pub_date,
        //       };
        //   return resultBook;
        // });
        const books = [...results];

        const totalBooks = books.length;
        currentPage = +currentPage;

        return res
          .status(StatusCodes.OK)
          .json({ books: books, pagination: { totalBooks, currentPage } });
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
  const token = req.token;
  const userId = token?.id;
  let sqlQuery = token
    ? `
  SELECT *,
  (SELECT COUNT(*) FROM likes WHERE book_id = books.id) AS likes,
  (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND book_id=?)) AS liked
  FROM books
  LEFT JOIN category
  ON books.category_id = category.category_id
  WHERE books.id= ?;
  `
    : `
  SELECT *,
  (SELECT COUNT(*) FROM likes WHERE book_id = books.id) AS likes
  FROM books
  LEFT JOIN category
  ON books.category_id = category.category_id
  WHERE books.id= ?;
  `;

  let queryArg = token ? [+userId, +bookId, +bookId] : [+bookId, +bookId];
  dbConnection.query(sqlQuery, queryArg, (err, results) => {
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

/**
 * 1달 이내 출간된 신간 도서 조회
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getNewBooks = (req, res, next) => {
  const { limit, currentpage } = req.query;
  const offset = +limit * (+currentpage - 1);
  const token = req.token;

  let sqlQuery = token
    ? `
  SELECT *, (SELECT COUNT(*) from likes WHERE book_id = books.id) AS likes FROM bookkio.books
  WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
  LIMIT ? OFFSET ?
  `
    : `
  SELECT * FROM bookkio.books
  WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
  LIMIT ? OFFSET ?
  `;

  dbConnection.query(sqlQuery, [+limit, offset], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
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
  getNewBooks,
};
