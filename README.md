# Node blog service

A blogging service built with Node as an example project for Founders & Coders.

![](https://user-images.githubusercontent.com/9408641/74652591-45fa9280-517e-11ea-90b9-dd22c873555e.gif)

## Local setup

You need [git](https://git-scm.com/), [Node](https://nodejs.org/en/) and [npm](npmjs.com/) (should come with Node) installed before you start.

1. Clone this repo
   ```sh
   git clone git@github.com:oliverjam/fac-project-node.git
   ```
1. Install dependencies
   ```sh
   npm install
   ```
1. Start the server
   ```sh
   npm start
   ```
   or start the development server (automatically restarts when you make changes)
   ```sh
   npm run dev
   ```
1. Run the tests
   ```sh
   npm test
   ```

## Project structure

All code is inside the `server/` directory. The top-level is reserved for config (e.g. for Node, ESLint, git).

The main server entrypoint is `server/index.js`. This creates a Node HTTP server and handles routing requests with different paths to the correct handler function.

The handler functions live in `server/handlers/`. Each function handles a request to a single path.

### Handlers

| Route          | File            | Description                                                                                                                                                              |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`            | `home.js`       | Renders the form for adding a post, and a list of existing posts                                                                                                         |
| `/create-post` | `createPost.js` | Receives the form submission for a new post, saves it and redirects to `/posts`                                                                                          |
| `/posts`       | `posts.js`      | Renders all of the posts, with corresponding delete buttons URL                                                                                                          |
| `/remove/:id`  | `removePost.js` | Deletes the post matching the ID in the URL                                                                                                                              |
| `/assets/*`    | `assets.js`     | Responds with any file in `server/assets/`, with [content-type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) matching the file extension |
| `/*`           | `notFound.js`   | Renders "Not found" for any route not matching a handler                                                                                                                 |

### "Database"

Submitted posts are kept in an array in memory. This means every time the server restarts they will be lost. In reality you'd use a database to save this information, but we're learning about them next week. A good stretch goal would be to save this array to a JSON file using `fs.writeFile`.

The `server/db.js` file keeps track of the posts array and exports functions for getting, creating and deleting posts.

### Layout

Any route that renders HTML uses `server/layout.js` to wrap its custom HTML in the generic stuff every page needs (`<head>`, `<body>`, CSS etc).

## Testing

All routes are tested using Supertest. `tests/router.test.js` contains a single Tape test for each route.
