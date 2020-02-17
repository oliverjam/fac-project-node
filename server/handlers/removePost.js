const db = require("../db");

function removePost(request, response) {
  // splits "/remove/hello-world" into ["", "remove", "hello-world"]
  // then assigns the 3rd thing in the array to `id`
  const [, , id] = request.url.split("/");
  db.remove(id);
  response.writeHead(302, { Location: `/` });
  response.end();
}

module.exports = removePost;
