const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const api = express();
const port = 3030;


// ==== Serve the actual website ====================
// api.use(express.static("../vue-frontend"));


// ==== Handle REST GET Requests ====================
api.get('/api', (req, res) => {
    res.statusCode(200).send("The api is indeed online. Please see the README file on the <a href='https://github.com/phobiac01/mavot_bot#readme'>Github Page</a> for details.");
});

api.get('/api/heartbeat', (req, res) => {
  res.statusCode(200).send("OK");
});

api.get('/api/authState', (req, res) => {
  res.json({authed: true});
});


// ==== Handle REST POST Requests ====================
// api.post();


// ==== Handle Websocket Connections ====================



// ==== Listen to incoming requests ====================
api.listen(port, () => {
  console.log(`] Mavot front-end/api listening at http://localhost:${port}`);
});


// ==== Misc Functions ====================
// Initialize the db status variable, then update the conenction status every 6 seconds
checkDbStatus();
function checkDbStatus() {
  dbConnectionStatus = mongoose.connection.readyState;

  setTimeout(() => {
    dbConnectionStatus = mongoose.connection.readyState;
    checkDbStatus();
  }, 6000);
}
