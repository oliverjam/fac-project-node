const layout = require("../layout");
const db = require("../db");

function posts(request, response) {
  const posts = db.get(); // get array of all posts
  const html = layout(`
  <h1>Posts</h1>
  <ul>
    ${posts
      .map(
        post =>
          `<li>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <a href="/remove/${post.id}" class="button-link">Delete post</a>
          </li>`
      )
      .join("")}
  `);
  response.writeHead(200, { "content-type": "text/html" });
  response.end(html);
}

module.exports = posts;
