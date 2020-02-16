const db = require("../db");

function removePost(request, response) {
  const [, , id] = request.url.split("/");
  db.remove(id);
  response.writeHead(302, { Location: `/` });
  response.end();
}

module.exports = removePost;
