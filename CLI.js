const { mdLinks } = require('./index.js')
const functions = require('./functions.js');

const absolutePath = functions.toAbsolutePath('./README.md');

//console.log('Ruta absoluta:', absolutePath);

mdLinks(absolutePath).then((result) => {console.log(result)}).catch((error) => {console.log(error)});