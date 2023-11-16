const path = require("path");
const fs = require("fs");
const { readFile } = require("fs/promises");

exports.toAbsolutePath = (relativePath) => {
  return path.resolve(relativePath);
};

exports.verifyPathExists = (absolutePath) => {
  return fs.existsSync(absolutePath);
};

exports.isMarkdownFile = (absolutePath) => {
  const fileExtension = path.extname(absolutePath);
  const markdownExtensions = [".md", ".mkd", ".mdwn", ".mdown", ".mdtxt", ".mdtext", ".markdown", ".text"];
  return markdownExtensions.includes(fileExtension);
};

exports.readMarkdownFile = (absolutePath) => {
    return readFile(absolutePath, { encoding: "utf8" }); 
};
