let http = require('http');

function onRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.writeHead('Hello world');
  res.end();
}

http.createServer(onRequest).listen(3000);
