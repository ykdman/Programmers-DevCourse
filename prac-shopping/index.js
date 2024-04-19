let server = require("./server.js");
let requestHandle = require("./requestHandle.js");

const mariadb = require("./database/connect/mariadb.js");

server.start(requestHandle.handle);
