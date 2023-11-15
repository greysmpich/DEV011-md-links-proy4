const { mdLinks } = require('./index.js')
const functions = require('./functions.js');

const absolutePath = functions.toAbsolutePath('./README.md');
const pathExists = functions.verifyPathExists(absolutePath);
//console.log('Ruta absoluta:', absolutePath);

mdLinks(pathExists).then((result) => {console.log(result);}).catch((error) => {console.log(error)});