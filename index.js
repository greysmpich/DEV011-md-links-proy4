const functions = require('./functions.js');

const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    if (!functions.verifyPathExists(path)) {
      reject('La ruta no existe');
    } else if (!functions.isMarkdownFile(path)) {
      reject('El archivo no es un archivo Markdown');
    } else {
      resolve("Éxito");
    }
  });
};

module.exports = { mdLinks };