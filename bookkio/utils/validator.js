const { validationResult } = require("express-validator");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Number} statusCode
 */
const requestValidator = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }
  next();
};

module.exports = {
  requestValidator,
};
