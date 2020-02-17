const path = require("path");
const fs = require("fs").promises;

// browsers need the correct MIME type for files (they ignore file extension)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
const types = {
  css: "text/css",
  ico: "image/x-icon",
};

function assets(request, response) {
  // splits "/assets/styles.css" to ["", "assets", "styles.css"]
  // assigns the 3rd thing in array to `fileName`
  const [, , fileName] = request.url.split("/");
  // splits "styles.css" into ["styles", "css"]
  // assigns 2nd thing in array to `ext
  const [, ext] = fileName.split(".");
  // get the right MIME type for this file extension
  const type = types[ext];
  // read the file from the assets directory
  fs.readFile(path.join(__dirname, "..", "assets", fileName))
    // if successful readFile resolves with the string contents of the file
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
