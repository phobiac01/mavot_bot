const { Schema, model, Mongoose } = require("mongoose");
const date = Date.now;

const userSchema = new Schema({
	userID: Number,
	displayName: String,
	phashword: String,
	// 0 = None, 1 = Stats Only, 2 = Read, 3 = Write, 4 = Control
	permissionLevel: { type: Number, default: 0 },
	firstSeen: { type: Date, default: Date.now },
	lastSeen: { type: Date, default: Date.now },
	auth: [
		{
			token: String,
			issueDate: { type: Date, default: Date.now },
			validUntil: { type: Date, default: Date.now }, // new Date(date.setMonth(date.getMonth() + 1)) },
			sourceIP: String,
		},
	],
	previousCommands: [ {command: String, date: Date } ], // Limit 5
	lastTopic: String,
	subscribedToLoreUpdates: { type: Boolean, default: false },
});

const metricsSchema = new Schema({
	botLastStarted: Date,
	dbLastModified: [{ userID: String, date: Date, ipAddress: String }],
	webUserLogins: [{ userID: String, date: Date, ipAddress: String }],
	totalBotQueries: Number,
	timesNasty: Number,
	lastQueryDate: Date,
	usersInteractedWith: [String], // Can be counted when needed for now
	serversInteractedWith: [String] // Can be counted when needed for now
});

const topicSchema = new Schema({
	topic: String,
	displayName: String,
	dateAdded: { type: Date, default: Date.now },
	lastModified: { type: Date, default: Date.now },
	children: []
});

// const serverSchema = new Schema({
// 	serverID: Number,
// 	title: String,
// 	iconURL: String,
// 	joinDate: { type: Date, default: Date.now },
// 	auth: [
// 		{
// 			token: String,
// 			issueDate: { type: Date, default: Date.now },
// 			validUntil: { type: Date, default: new Date(date.setMonth(date.getMonth() + 1)) },
// 			sourceIP: String,
// 		},
// 	],
// });

exports.User = model("User", userSchema);
exports.Topic = model("Topic", topicSchema);
exports.Metrics = model("Metrics", metricsSchema);
