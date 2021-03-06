const handlers = require("./handlers");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    handlers.home(request, response);
  } else if (url === "/create-post") {
    handlers.createPost(request, response);
  } else if (url === "/posts") {
    handlers.posts(request, response);
  } else if (url.startsWith("/post")) {
    handlers.post(request, response);
  } else if (url.startsWith("/remove")) {
    handlers.removePost(request, response);
  } else if (url.startsWith("/assets")) {
    handlers.assets(request, response);
  } else {
    handlers.notFound(request, response);
  }
}

module.exports = router;
