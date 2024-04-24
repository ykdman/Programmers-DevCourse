let http = require("http");

function onRequest(req, res) {
  console.log("connected");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Hello world");
  res.end();
}

http.createServer(onRequest).listen(3000);
