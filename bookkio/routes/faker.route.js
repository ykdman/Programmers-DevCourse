const express = require("express");
const {
  getRandomUser,
  createRandomUsers,
} = require("../controller/faker.controller.js");
const router = express.Router();

router.get("/user", getRandomUser);
router.post("/user/:max", createRandomUsers);

module.exports = router;
