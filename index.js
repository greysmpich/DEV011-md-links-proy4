const mdLinks = (path, links) => {
  return new Promise((resolve, reject) => {
    if (path) {
      resolve(links);
    }
    reject(error);
  });
};

module.exports = { mdLinks };