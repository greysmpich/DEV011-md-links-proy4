const { mdLinks } = require('./index.js')
const functions = require('./functions.js');

const absolutePath = functions.absolutePath('./README.md');
console.log('Ruta absoluta:', absolutePath);

