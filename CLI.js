const { mdLinks } = require('./index.js')
const fs = require('fs');
const functions = require('./functions.js');

const absolutePath = functions.absolutePath('./README.md');
const pathExists = fs.existsSync(absolutePath)
//console.log('Ruta absoluta:', absolutePath);

mdLinks(pathExists).then((result) => {console.log(result);}).catch((error) => {console.log(error)});