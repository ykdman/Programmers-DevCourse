/**
 * 전체 도서 조회
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const searchBooks = (req, res, next) => {
  const { categoryId } = req.query;
  console.log(categoryId);
  if (categoryId) {
    return res.status(200).json({ message: `${categoryId} 로 책 검색 API` });
  }
  return res.status(200).json({ message: "전체 도서 조회" });
};

/**
 * 개별 도서 조회 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const searchOneBook = (req, res, next) => {
  const { bookId } = req.params;
  return res.status(200).json({ message: "개별 도서 조회 API" });
};

module.exports = {
  searchBooks,
  searchOneBook,
};
