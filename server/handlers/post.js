const layout = require("../templates/layout");
const db = require("../db");

function post(request, response) {
  const [, , id] = request.url.split("/");
  const post = db.get(id);
  if (!post) {
    response.writeHead(404);
    const html = layout(`<h1>Post not found</h1>`);
    response.end(html);
  }
  const html = layout(`
    <h1>${post.title}</h1>
    <a href="/remove/${post.id}">Delete post</a>
    <p>${post.body}</p>
  `);
  response.end(html);
}

module.exports = post;
