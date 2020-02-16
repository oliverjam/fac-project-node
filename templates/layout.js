function layout(content) {
  return `
  <!DOCTYPE html>
  <html>
    <head charset="utf-8">
      <meta>
      <title>Test</title>
      <meta name="viewport" content="width=device-width">
    </head>
    <body>
      ${content}
    </body>
  </html>
  `;
}

module.exports = layout;
