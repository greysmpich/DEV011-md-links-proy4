#! /usr/bin/env node
const { mdLinks } = require("./index.js");
const colors = require("@colors/colors");

const path = process.argv[2];
const validate = process.argv.includes("--validate");
const stats = process.argv.includes("--stats");

mdLinks(path, validate, stats)
  .then((results) => {
    if(!Array.isArray(results) && typeof results === 'object'){
        Object.keys(results).forEach((key) => {
            console.log(`${key}: ${results[key]}`);
          });
    } else if(Array.isArray(results)){
    results.forEach((link) => {
        if (link.Total) {
            console.log(`Total: ${link.Total}, Unique: ${link.Unique}`);
          } else if (!link.ok && !link.status) {
            console.log(`${link.text} - ${colors.cyan(link.href)} - File: ${link.file}`);
          } else if (link.ok === "ok") {
            console.log(`${colors.green(link.ok)} (${colors.green(link.status)}) - ${link.text} - ${colors.cyan(link.href)} - File: ${link.file}`);
          } else {
            console.log(`${colors.red(link.ok)} (${colors.red(link.status)}) - ${link.text} - ${colors.cyan(link.href)} - File: ${link.file}`);
          }
        });
   } 
  })
  .catch((error) => {
    console.log(error);
  });
