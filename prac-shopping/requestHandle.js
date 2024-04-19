const mariadb = require("./database/connect/mariadb.js");
const fs = require("fs");

// view page
const mainView = fs.readFileSync("./main.html", "utf-8");
const orderView = fs.readFileSync("./orderlist.html", "utf-8");

const main = (res) => {
  console.log("main");

  mariadb.query(`SELECT * FROM product`, function (err, rows) {
    console.log(err);
    console.log(rows);
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(mainView);
  res.end();
};

const login = (res) => {
  console.log("login");
  res.end("로그인 화면!");
};

const home = (res) => {
  console.log("홈화면");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("ykdman's home");
};

const errorPage = (res) => {
  console.log("error page");
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Page 404!");
};

const redRacket = (res) => {
  fs.readFile("./asset/img/redRacket.png", function (err, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write(data);
    res.end();
  });
};
const blueRacket = (res) => {
  fs.readFile("./asset/img/blueRacket.png", function (err, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write(data);
    res.end();
  });
};
const blackRacket = (res) => {
  fs.readFile("./asset/img/blackRacket.png", function (err, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write(data);
    res.end();
  });
};

const mainCss = (res) => {
  fs.readFile("./style/main.css", function (err, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    res.write(data);
    res.end();
  });
};

const orderListCss = (res) => {
  fs.readFile("./style/orderlist.css", function (err, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    res.write(data);
    res.end();
  });
};

const orderPage = (res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(orderView);

  mariadb.query(`SELECT * FROM orderlist;`, function (err, result) {
    if (err) {
      console.log("에러발생");
      console.log(err);
    }
    result.forEach((row) => {
      res.write(`
          <tr>
          <td>${row.product_id}</td>
          <td>${row.order_date}</td>
          </tr>
        `);
    });
  });

  res.end();
};

const order = (res, productId) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  mariadb.query(
    `
  INSERT INTO orderlist
  VALUES (${productId}, '${new Date().toLocaleDateString()}');
  `,
    function (err, row) {
      console.log(row);
    }
  );
};

const handle = {};
handle["/main"] = main;
handle["/login"] = login;
handle["/"] = main;
handle["/error"] = errorPage;
handle["/orderlist.html"] = orderPage;

/**
 * image directory
 */
handle["/asset/img/redRacket.png"] = redRacket;
handle["/asset/img/blueRacket.png"] = blueRacket;
handle["/asset/img/blackRacket.png"] = blackRacket;

/** css */
handle["/style/main.css"] = mainCss;
handle["/style/orderlist.css"] = orderListCss;

/** order */
handle["/order"] = order;

exports.handle = handle;
