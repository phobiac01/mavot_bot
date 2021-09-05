const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
var cors = require("cors");
const api = express();
const port = 3030;

// ==== Serve the actual website ====================
api.use(cors());
api.use(express.static("../vue-frontend"));

// ==== Handle REST GET Requests ====================
api.get("/api", (req, res) => {
	res
		.status(400)
		.send(
			"The api is indeed online. Please see the README file on the <a href='https://github.com/phobiac01/mavot_bot#readme'>Github Page</a> for details."
		);
});

api.get("/api/heartbeat", (req, res) => {
	res.sendStatus(200);
});

api.get("/api/authstate", (req, res) => {
	console.log("> Token:", req.headers.authorization);
	if (req.headers.authorization == "6969420")
		res.json({
			userID: 1234567890,
			displayName: "Default",
			avatarURL: "http://localhost:3030/api/avatar?1234567890",
		});
	else res.status(401);
});

// ==== Handle REST POST Requests ====================
api.post("/api/login", (req, res) => {
	res.sendStatus(501);
});

// ==== Handle Websocket Connections ====================

// ==== Listen to incoming requests ====================
api.listen(port, () => {
	console.log(`> Mavot front-end/api listening at http://localhost:${port}`);
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
