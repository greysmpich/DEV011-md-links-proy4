const { mdLinks } = require('./index.js')

const path = process.argv[2];
const validate = process.argv[3] === 'true';

mdLinks(path, validate).then((result) => {console.log(result)}).catch((error) => {console.log(error)});