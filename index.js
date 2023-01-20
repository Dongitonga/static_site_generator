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

// app.use(express.static(outputDir));

// app.get("/", (req, res) => {
//   res.sendFile(`${outputDir}/index.html`);
// });

// app.get("/:page", (req, res) => {
//   res.sendFile(`${outputDir}/${req.params.page}.html`);
// });

// // Handle requests for non-existing pages
// // app.get("*", (req, res) => {
// //   res.status(404).sendFile(`${outputDir}/404.html`);
// // });
// app.get("*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, outputDir, "404.html"));
// });

// app.listen(3000, () => {
//   console.log("Server started on http://localhost:3000");
// });
