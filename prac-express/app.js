const { db, db2 } = require("./map-demo");

console.log(db);
console.log(db2);

const express = require("express");
const port = 3000;

// express 객체 사용 선언
const app = express();

// root url response
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/:id", (req, res) => {
  let { id } = req.params;
  id = +id;
  if (db.get(id) === undefined) {
    res.json({
      message: "없는 메세지 입니다.",
    });
  } else {
    const product = { ...db.get(id) };
    product.id = id;
    res.json(product);
  }
});

/**app.get
 * arg1 : url
 * arg2 : callbackFn (request, response)
 */
app.get("/test", (req, res) => {
  res.send("Test API");
});

app.get("/hello", (req, res) => {
  res.send("안녕하세여");
});
app.get("/bye", (req, res) => {
  res.send("안녕히 가세요");
});

app.get("/meet", (req, res) => {
  res.send("만나서 반갑습니다.");
});

app.get("/products/:item", (req, res) => {
  const item = +req.params.item;
  if (item > 5) {
    console.log("5보다 큰 수 가 들어왔습니다.");
  }
  const testObj = {
    name: "kdman",
    age: 26,
    loc: "seoul",
    item,
  };

  console.log("GET Object");
  console.dir(testObj);

  console.log("Request Params");
  console.dir(req.params);

  res.send(testObj);
});

app.get("/watch", (req, res) => {
  const querys = req.query;
  console.log(querys);

  res.send({ ...querys });
});

// port : 3000
app.listen(port, () => {
  console.log(`Server Listening : ${port}`);
});
