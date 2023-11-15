const path = require('path');
const fs = require('fs');

exports.toAbsolutePath = (relativePath) => {
  return path.resolve(relativePath)
}

exports.verifyPathExists = (absolutePath) => {
 return fs.existsSync(absolutePath)
}

exports.isMarkdownFile = (absolutePath) => {
  const fileExtension = path.extname(absolutePath);
  const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  return markdownExtensions.includes(fileExtension);
}