const { createServer } = require("http");
const router = require("./router");

const server = createServer(router);

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
