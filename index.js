const functions = require("./functions.js");

const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    let absolutePath = path;
    if(!functions.toAbsolutePath(path)){
      absolutePath = functions.toAbsolutePath(path);
    }
    if (!functions.verifyPathExists(absolutePath)) {
      reject("La ruta no existe");
    } else if (!functions.isMarkdownFile(absolutePath)) {
      reject("El archivo no es un archivo Markdown");
    } else {
      const simulatedError = new Error("Error simulado al leer el archivo Markdown");
      functions.readMarkdownFile(absolutePath)
        .then((content) => {
          const extractedLinks = functions.findLinks(content, absolutePath);
          resolve(extractedLinks);
          throw simulatedError;
        })
        .catch((error) => {
          reject(new Error(`Error al leer el archivo Markdown: ${error.message}`));
        });
    }
  });
};

module.exports = { mdLinks };
