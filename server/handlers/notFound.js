const layout = require("../templates/layout");

function notFound(request, response) {
  response.writeHead(404);
  const html = layout(`<h1>Not found</h1>`);
  response.end(html);
}

module.exports = notFound;
