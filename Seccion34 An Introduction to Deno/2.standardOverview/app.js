const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello world from node ");
});

server.listen(3000);
// Run as  node app.js
