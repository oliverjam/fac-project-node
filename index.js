const { createServer } = require("http");

const server = createServer((request, response) => {
  switch (request.url) {
    case "/":
      response.end(`<h1>Hello world</h1>`);
      break;
    default:
      response.end(`<h1>Not found</h1>`);
  }
});

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
