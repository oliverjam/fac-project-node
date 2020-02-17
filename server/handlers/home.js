const layout = require("../layout");
const db = require("../db");

function home(request, response) {
  const posts = db.get();
  const html = layout(`
    <h1>Write post</h1>
    <form action="/create-post" method="POST">
      <label for="title">Title</label>
      <input id="title" name="title" required autofocus>
      <label for="body">Body</label>
      <textarea id="body" name="body" rows="6" required></textarea>
      <button type="submit">Post</button>
    </form>
    <h2>Posts</h2>
    <ul>
      ${posts
        .map(post => `<li><a href="/post/${post.id}">${post.title}</a></li>`)
        .join("")}
    </h2>
  `);
  response.writeHead(200, { "content-type": "text/html" });
  response.end(html);
}

module.exports = home;
