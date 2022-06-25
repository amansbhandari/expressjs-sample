const http = require("http");

const port = process.env.port || 2000;

const app = require("./app");

const server = http.createServer(app);

server.listen(port, () => {
  console.log("server is running");
});
