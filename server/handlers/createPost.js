const db = require("../db");

function createPost(request, response) {
  // this handler only supports POST requests
  if (request.method !== "POST") {
    response.writeHead(405);
    response.end("Method not allowed");
  }
  // POST body is a stream, so we have to add each little bit as we get it
  let body = "";
  request.on("data", chunk => {
    body += chunk;
  });
  // once we've received the entire stream we can handle the request
  request.on("end", () => {
    // turns "title=hello&body=test" into { title: "hello", body: "test" }
    const parsedBody = new URLSearchParams(body);
    const data = Object.fromEntries(parsedBody);
    // need to make the title URL safe (replace spaces with -)
    // this is not good: should use real slugify library
    const titleSlug = data.title.replace(/\W/g, "-");
    // save the submitted post, plus the ID
    db.add({ ...data, id: titleSlug });
    // redirect to the homepage, which should show the new post
    response.writeHead(302, { Location: `/posts` });
    response.end();
  });
}

module.exports = createPost;
