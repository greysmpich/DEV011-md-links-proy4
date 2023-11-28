const path = require("path");
const fs = require("fs");
const { readFile } = require("fs/promises");
const axios = require("axios");

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
  return new Promise((resolve) => {
    readFile(absolutePath, { encoding: "utf8" })
    .then((content) => { resolve(content); })
  });
};

exports.findLinks = (content, absolutePath) => {
  const regExpLink = /\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g;
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

exports.validateLinks = (links) => {
  const linkPromises = links.map((link) => {
    return axios.head(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.status >= 200 && response.status < 300 ? 'ok' : 'fail';
        return link;
      })
      .catch((error) => {
        link.status = error.response ? error.response.status : "N/A";
        link.ok = 'fail';
        return link;
      });
  });
  return Promise.all(linkPromises)
};

exports.stats = (links) => {
  const uniqueLinks = links.filter((link, index) => {
     return links.indexOf(link) === index;
  })

    return {
      Total: links.length,
      Unique: uniqueLinks.length
    }
};

exports.statsWithValidate = (validatedLinks) => {
  const brokenLinks = validatedLinks.filter((link) => link.ok === "fail");
  const unbrokenLinks = validatedLinks.filter((link) => link.ok === "ok");

 return {
  ...this.stats(validatedLinks),
  Active: unbrokenLinks.length,
  Broken: brokenLinks.length,
 }
};