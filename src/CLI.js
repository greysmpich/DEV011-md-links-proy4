const { mdLinks } = require('./index.js')

const path = process.argv[2];
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');

mdLinks(path, validate, stats).then((result) => {console.log(result)}).catch((error) => {console.log(error)});
