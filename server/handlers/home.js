const layout = require("../layout");

function home(request, response) {
  const html = layout(`
    <h1>Write post</h1>
    <form action="/create-post" method="POST">
      <label for="title">Title</label>
      <input id="title" name="title" required autofocus>
      <label for="body">Body</label>
      <textarea id="body" name="body" rows="6" required></textarea>
      <button type="submit">Post</button>
    </form>
  `);
  response.writeHead(200, { "content-type": "text/html" });
  response.end(html);
}

module.exports = home;
