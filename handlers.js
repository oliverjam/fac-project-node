const layout = require("./templates/layout");

function home(request, response) {
  const html = layout(`<h1>Hello world</h1>`);
  response.end(html);
}

function notFound(request, response) {
  const html = layout(`<h1>Not found</h1>`);
  response.end(html);
}

module.exports = { home, notFound };
