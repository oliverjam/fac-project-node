const layout = require("./templates/layout");
const db = require("./db");

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
    response.writeHead(302, { Location: `/` });
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
    <a href="/remove/${post.id}">Delete post</a>
    <p>${post.body}</p>
  `);
  response.end(html);
}

function removePost(request, response) {
  const [, , id] = request.url.split("/");
  db.remove(id);
  response.writeHead(302, { Location: `/` });
  response.end();
}

function notFound(request, response) {
  response.writeHead(404);
  const html = layout(`<h1>Not found</h1>`);
  response.end(html);
}

module.exports = { home, createPost, post, removePost, notFound };
