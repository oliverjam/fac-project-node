const layout = require("../layout");
const db = require("../db");

function post(request, response) {
  // splits "/post/hello-world" into ["", "post", "hello-world"]
  // then assigns the 3rd thing in the array to `id`
  const [, , id] = request.url.split("/");
  const post = db.get(id);
  if (!post) {
    response.writeHead(404, { "content-type": "text/html" });
    const html = layout(`<h1>Post not found</h1>`);
    return response.end(html);
  }
  const html = layout(`
    <h1>${post.title}</h1>
    <a href="/remove/${post.id}">Delete post</a>
    <p>${post.body}</p>
  `);
  response.writeHead(200, { "content-type": "text/html" });
  response.end(html);
}

module.exports = post;
