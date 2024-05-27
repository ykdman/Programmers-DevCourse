/**
 * 좋아요 추가 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const addLike = (req, res) => {
  return res.status(200).json({ message: "좋아요 추가 API" });
};

const deleteLike = (req, res) => {
  return res.status(200).json({ message: "좋아요 제거 API" });
};

module.exports = {
  addLike,
  deleteLike,
};
