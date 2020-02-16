function home(request, response) {
  response.end(`<h1>Hello world</h1>`);
}

function notFound(request, response) {
  response.end(`<h1>Not found</h1>`);
}

module.exports = { home, notFound };
