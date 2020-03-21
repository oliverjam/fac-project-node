const db = require("../db");

function removePost(request, response) {
  // splits "/remove/hello-world" into ["", "remove", "hello"]
  const urlArray = request.url.split("/");
  // assigns the 3rd thing in the array ("hello") to `id`
  const id = urlArray[2];
  db.remove(id);
  response.writeHead(302, { Location: `/` });
  response.end();
}

module.exports = removePost;
