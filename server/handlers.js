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
    const titleSlug = data.title.replace(/\W/g, "-");
    db.add({ ...data, id: titleSlug });
    response.writeHead(302, { Location: `post/${titleSlug}` });
    response.end();
  });
}

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
    <p>${post.body}</p>
  `);
  response.end(html);
}

function notFound(request, response) {
  response.writeHead(404);
  const html = layout(`<h1>Not found</h1>`);
  response.end(html);
}

module.exports = { home, createPost, post, notFound };
