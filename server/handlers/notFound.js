const layout = require("../templates/layout");

function notFound(request, response) {
  const html = layout(`<h1>Not found</h1>`);
  response.writeHead(404, { "content-type": "text/html" });
  response.end(html);
}

module.exports = notFound;
