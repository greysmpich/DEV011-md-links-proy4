const path = require("path");
const fs = require("fs");
const { readFile } = require("fs/promises");

exports.isAbsolutePath = (relativePath) => {
  return path.isAbsolute(relativePath);
};

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

exports.findLinks = (content, absolutePath) => {
  const regExpLink = /\[([^\]]*)\]\((.*?)\)/g;
  const links = [];
  let coincidence;
  const fileName = path.basename(absolutePath);
  while ((coincidence = regExpLink.exec(content)) !== null) {
    const linkObject = {
      href: coincidence[2],
      text: coincidence[1],
      file: fileName,
    };
    links.push(linkObject);
  }
  return links;
};