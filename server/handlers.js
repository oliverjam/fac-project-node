const layout = require("./templates/layout");

function home(request, response) {
  const html = layout(`
    <h1>Write post</h1>
    <form action="/create-post" method="POST">
      <label for="title">Title</label>
      <input id="title" name="title">
      <label for="body">Body</label>
      <textarea id="body" name="body"></textarea>
      <button type="submit">Post</button>
    </form>
  `);
  response.end(html);
}

function notFound(request, response) {
  const html = layout(`<h1>Not found</h1>`);
  response.end(html);
}

module.exports = { home, notFound };
