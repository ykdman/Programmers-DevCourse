const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./routes/users.router.js");
const booksRouter = require("./routes/books.route.js");
const cartsRouter = require("./routes/cart.route.js");
const ordersRouter = require("./routes/orders.route.js");
const likesRouter = require("./routes/likes.router.js");
const fakerRouter = require("./routes/faker.route.js");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/cart", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/likes", likesRouter);
app.use("/fake", fakerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
