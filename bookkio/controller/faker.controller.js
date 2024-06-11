const { StatusCodes } = require("http-status-codes");
const { faker } = require("../model/faker.data.js");

/**
 * 랜덤한 사용자 정보를 반환하는 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getRandomUser = (req, res) => {
  const userData = {
    user_name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    contact: faker.helpers.fromRegExp("010-[0-9]{4}-[0-9]{4}"),
  };

  return res.status(StatusCodes.OK).json(userData);
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const createRandomUsers = (req, res) => {
  const { max } = req.params;
  const userDatas = [];
  for (let i = 0; i < +max; i++) {
    let user = {
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.helpers.fromRegExp("010-[0-9]{4}-[0-9]{4}"),
      full_name: faker.person.fullName(),
      company: faker.company.name(),
    };
    userDatas.push(user);
  }

  return res.status(StatusCodes.OK).json(userDatas);
};

module.exports = {
  getRandomUser,
  createRandomUsers,
};
