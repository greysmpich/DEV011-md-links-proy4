const path = require('path');
const fs = require('fs');

exports.toAbsolutePath = (relativePath) => {
  return path.resolve(relativePath)
}

exports.verifyPathExists = (absolutePath) => {
 return fs.existsSync(absolutePath)
}
