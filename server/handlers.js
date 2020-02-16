const layout = require("./templates/layout");
const db = require("./db");

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

function createPost(request, response) {
  let body = "";
  request.on("data", chunk => {
    body += chunk;
  });
  request.on("end", () => {
    const parsedBody = new URLSearchParams(body);
    const data = Object.fromEntries(parsedBody);
    db.add(data);
    const titleSlug = data.title.replace(/\W/g, "-");
    response.writeHead(302, { Location: `posts/${titleSlug}` });
    response.end();
  });
}

function notFound(request, response) {
  const html = layout(`<h1>Not found</h1>`);
  response.end(html);
}

module.exports = { home, createPost, notFound };
