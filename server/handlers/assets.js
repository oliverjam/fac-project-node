const path = require("path");
const fs = require("fs").promises;

const types = {
  css: "text/css",
};

function assets(request, response) {
  const [, , fileName] = request.url.split("/");
  const [, ext] = fileName.split(".");
  const type = types[ext];

  fs.readFile(path.join(__dirname, "..", "assets", fileName))
    .then(content => {
      response.writeHead(200, { "content-type": type });
      response.end(content);
    })
    .catch(error => {
      console.log(error);
      response.writeHead(404);
      response.end();
    });
}

module.exports = assets;
