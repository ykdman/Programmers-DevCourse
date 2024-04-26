const express = require("express");
const { dbYoutuber } = require("./map-demo");
const app = express();

app.listen(3000);

app.get("/youtuber/:id", (req, res) => {
  let { id } = req.params;
  id = +id;
  const youtuber = dbYoutuber.get(id);

  if (youtuber === undefined) {
    res.json({
      message: "유튜버 정보를 찾을수 없습니다.",
    });
  } else {
    const product = { ...youtuber };
    product.id = id;
    res.json(product);
  }
});
