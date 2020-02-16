let posts = [];

function add(post) {
  const id = Date.now();
  posts.push({ ...post, id });
}

function remove(id) {
  posts = posts.filter(post => post.id !== id);
}

module.exports = { posts, add, remove };
