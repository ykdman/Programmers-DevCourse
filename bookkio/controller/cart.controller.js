/**
 * 장바구니에 아이템 담기
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const addItemToCart = (req, res, next) => {
  const { bookId, count } = req.body;
  return res
    .status(200)
    .json({ message: `${bookId} 가 장바구니에 담겼습니다.` });
};

/**
 * 장바구니 조회 로직
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getAllCartItems = (req, res, next) => {
  return res.status(200).json({ message: "장바구니 목록 조회 API" });
};

module.exports = {
  addItemToCart,
  getAllCartItems,
};
