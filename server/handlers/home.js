const layout = require("../templates/layout");
const db = require("../db");

function home(request, response) {
  const posts = db.get();
  const html = layout(`
    <h1>Write post</h1>
    <form action="/create-post" method="POST">
      <label for="title">Title</label>
      <input id="title" name="title">
      <label for="body">Body</label>
      <textarea id="body" name="body"></textarea>
      <button type="submit">Post</button>
    </form>
    <h2>Posts</h2>
    <ul>
      ${posts.map(
        post => `<li><a href="/post/${post.id}">${post.title}</a></li>`
      )}
    </h2>
  `);
  response.end(html);
}

module.exports = home;
