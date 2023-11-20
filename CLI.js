const { mdLinks } = require('./index.js')

const path = './README.md';

mdLinks(path).then((result) => {console.log(result)}).catch((error) => {console.log(error)});

mdLinks(path, false).then((result) => {console.log(result)}).catch((error) => {console.log(error)});