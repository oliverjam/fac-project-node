const db = require("../db");

function createPost(request, response) {
  // this handler only supports POST requests
  if (request.method !== "POST") {
    response.writeHead(405);
    response.end("Method not allowed");
  }
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

module.exports = createPost;
