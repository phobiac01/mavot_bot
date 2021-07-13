console.log("Api code block ran.");

const express = require("express");
const api = express();
const port = 8080;

api.get('/', (req, res) => {
    res.sendStatus(200);
});

api.listen(port, () => {
  console.log(`Mavot front-end api listening at http://localhost:${port}`);
});
