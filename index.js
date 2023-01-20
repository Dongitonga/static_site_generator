const express = require("express");
const app = express();
const fs = require("fs");
const { marked } = require("marked");
const path = require("path");

const inputDir = `${__dirname}/pages`;
const outputDir = `${__dirname}/dir`;

fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.endsWith(".md")) {
      fs.readFile(`${inputDir}/${file}`, "utf8", (err, data) => {
        if (err) throw err;

        const html = marked(data);

        fs.writeFile(`${outputDir}/${file.slice(0, -3)}.html`, html, (err) => {
          if (err) throw err;
          console.log(`${file} has been converted and saved to ${outputDir}!`);
        });
      });
    }
  });
});

