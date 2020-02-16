function layout(content) {
  return `
  <!DOCTYPE html>
  <html>
    <head charset="utf-8">
      <meta>
      <title>Test</title>
      <meta name="viewport" content="width=device-width">
      <link rel="stylesheet" href="/assets/styles.css">
    </head>
    <body>
      ${content}
    </body>
  </html>
  `;
}

module.exports = layout;
