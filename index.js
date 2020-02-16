const { createServer } = require("http");

const server = createServer((request, response) => {
  response.end(`<h1>Hello world</h1>`);
});

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
