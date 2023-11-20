const functions = require("./functions.js");

const mdLinks = (path, validate) => {
  return new Promise((resolve, reject) => {
   
    const absolutePath = functions.isAbsolutePath(path) ? path : functions.toAbsolutePath(path);

    if (!functions.verifyPathExists(absolutePath)) {
      reject("La ruta no existe");
    } 

    if (!functions.isMarkdownFile(absolutePath)) {
      reject("El archivo no es un archivo Markdown");
    } 

      functions.readMarkdownFile(absolutePath)
        .then((content) => {
          if(validate === undefined || false){
            const extractedLinks = functions.findLinks(content, absolutePath);
            resolve(extractedLinks);
          }
          const extractedLinks = functions.findLinks(content, absolutePath); //modif con func status
          resolve(extractedLinks); //modif con array actualizado
        })
        .catch((error) => {
          reject(new Error(`Error al leer el archivo Markdown: ${error.message}`));
        });
  });
};

module.exports = { mdLinks };
