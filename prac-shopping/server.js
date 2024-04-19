// const http = require('http');

// const server = ((req, res) => {
//   res.writeHead(200, {'Content-Type' : 'text/html'});
//   res.write('Hello Node.js');
//   res.end()
// })

// http.createServer(server, )
const http = require("node:http");
const url = require("node:url");
const router = require("./router.js");

const hostname = "127.0.0.1";
const port = 8888;

const start = (handle) => {
  const onRequest = (req, res) => {
    let pathName = url.parse(req.url).pathname;
    let queryData = url.parse(req.url, true).query;

    router.route(pathName, handle, res, queryData.productId);
  };

  const server = http.createServer(onRequest);

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
};

exports.start = start;
