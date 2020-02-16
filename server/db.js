let posts = [];

function add(post) {
  posts.push(post);
}

function remove(id) {
  posts = posts.filter(post => post.id !== id);
}

function get(id) {
  if (!id) return posts;
  return posts.find(post => post.id === id);
}

module.exports = { add, remove, get };
