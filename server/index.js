const { createServer } = require("http");
const handlers = require("./handlers");

const server = createServer((request, response) => {
  const url = request.url;
  if (url === "/") {
    handlers.home(request, response);
  } else if (url === "/create-post") {
    handlers.createPost(request, response);
  } else if (url.includes("/post")) {
    handlers.post(request, response);
  } else {
    handlers.notFound(request, response);
  }
});

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
