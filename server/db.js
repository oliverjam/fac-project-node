let posts = [];

function add(post) {
  posts.push(post);
}

function remove(id) {
  posts = posts.filter(post => post.id !== id);
}

function get() {
  return posts;
}

module.exports = { add, remove, get };
