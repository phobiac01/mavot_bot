const express = require("express");
const api = express();
const port = 3030;

api.use(express.static("../vue-frontend"));

api.get('/api', (req, res) => {
    res.statusCode(200).send("The api is indeed online. Please see the README file on the <a href='https://github.com/phobiac01/mavot_bot#readme'>Github Page</a> for details.");
});

api.listen(port, () => {
  console.log(`Mavot front-end api listening at http://localhost:${port}`);
});
