const { createServer } = require("http");
const handlers = require("./handlers");

const server = createServer((request, response) => {
  switch (request.url) {
    case "/":
      return handlers.home(request, response);
    default:
      return handlers.notFound(request, response);
  }
});

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
