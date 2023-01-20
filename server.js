const express = require("express");
const app = express();

const port = 3000;

const outputDir = `${__dirname}/dir`;
app.use(express.static(outputDir));

app.get("/", (req, res) => {
  res.sendFile(`${outputDir}/index.html`);
});

app.get("/:page", (req, res, next) => {
  res.sendFile(`${outputDir}/${req.params.page}.html`);
});

app.get("*", (req, res) => {
  res.status(404).sendFile(`${outputDir}/404.html`);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
