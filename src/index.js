const functions = require("./functions.js");

const mdLinks = (path, validate = false) => {
  return new Promise((resolve, reject) => {
    const absolutePath = functions.isAbsolutePath(path) ? path : functions.toAbsolutePath(path);

    if (!functions.verifyPathExists(absolutePath)) {
      return reject("La ruta no existe");
    }

    if (!functions.isMarkdownFile(absolutePath)) {
      return reject("El archivo no es un archivo markdown");
    }

    functions.readMarkdownFile(absolutePath)
    .then((result) => functions.findLinks(result, absolutePath))
    .then((extractedLinks) => {
      if (validate) {
        return functions.validateLinks(extractedLinks);
       } else {
        resolve(extractedLinks);
       }
    })
     .then((result) => resolve(result))
  });
};

module.exports = { mdLinks };
