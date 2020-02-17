function layout(content) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Test</title>
      <meta name="viewport" content="width=device-width">
      <link rel="icon" href="/assets/favicon.ico" type="image/x-icon">
      <link rel="stylesheet" href="/assets/styles.css">
    </head>
    <body>
      ${content}
    </body>
  </html>
  `;
}

module.exports = layout;
