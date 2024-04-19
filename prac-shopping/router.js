const route = (pathName, handle, res, productId) => {
  if (pathName.includes("favicon")) {
    return;
  }
  console.log(`Path Name : ${pathName}`);

  if (typeof handle[pathName] === "function") {
    handle[pathName](res, productId);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(`<h1>PAGE Not Found!</h1>`);
    res.end();
  }

  // if (handle[pathName]) {
  //   handle[pathName](res);
  // } else {
  //   handle['/error'](res);
  // }
};

exports.route = route;
