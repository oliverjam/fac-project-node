const test = require("tape");
const supertest = require("supertest");
const router = require("../server/router");

test("home route is rendered correctly", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type", "text/html")
    .then(response => {
      const expectedTitle = `<h1>Write post</h1>`;
      t.true(
        response.text.includes(expectedTitle),
        "Home H1 should include `Write post`"
      );
      t.end();
    });
});

test("create post route is redirects to home", t => {
  const request = supertest(router);
  request
    .post("/create-post")
    .send("title=test&body=hello")
    .redirects(1)
    .expect(200)
    .expect("content-type", "text/html")
    .then(response => {
      const expectedLink = `<a href="/post/test">test</a>`;
      t.true(
        response.text.includes(expectedLink),
        "Home should include link to created post"
      );
      t.end();
    });
});

test("renders post page", t => {
  const request = supertest(router);
  request
    // have to create post first (as above)
    .post("/create-post")
    .send("title=test&body=hello")
    .then(() => {
      // make another request to delete the post we just created
      request
        .get("/post/test")
        .expect(200)
        .expect("content-type", "text/html")
        .then(response => {
          const expectedTitle = `<h1>test</h1>`;
          t.true(
            response.text.includes(expectedTitle),
            "H1 should include `test`"
          );
          const expectedBody = `<p>hello</p>`;
          t.true(
            response.text.includes(expectedBody),
            "P should include `hello`"
          );
          t.end();
        });
    });
});

test("deletes post correctly", t => {
  const request = supertest(router);
  request
    // have to create post first (as above)
    .post("/create-post")
    .send("title=test&body=hello")
    .then(() => {
      // make another request to delete the post we just created
      request
        // delete post we just created
        .get("/remove/test")
        .redirects(1)
        .expect(200)
        .expect("content-type", "text/html")
        .then(response => {
          // redirected back to homepage
          const expectedTitle = `<h1>Write post</h1>`;
          t.true(
            response.text.includes(expectedTitle),
            "Home H1 should include `Write post`"
          );
          // link shouldn't be there
          const notExpectedLink = `<a href="/post/test">test</a>`;
          t.false(
            response.text.includes(notExpectedLink),
            "Home page shouldn't include link to delete post"
          );
          // created post should no longer exist
          request
            .get("/post/test")
            .expect(404)
            .end(t.end);
        });
    });
});

test("nonexistent route render 404 page", t => {
  supertest(router)
    .get("/BROKEN")
    .expect(404)
    .expect("content-type", "text/html")
    .then(response => {
      const expectedTitle = `<h1>Not found</h1>`;
      t.true(
        response.text.includes(expectedTitle),
        "Missing page H1 should include `Not found`"
      );
      t.end();
    });
});

test("assets are served with correct content-type", t => {
  supertest(router)
    .get("/assets/styles.css")
    .expect(200)
    .expect("content-type", "text/css")
    .end(t.end);
});
