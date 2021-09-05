const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	userID: Number,
	displayName: String,
	avatarURL: String,
	// 0=None, 1=Stats Only, 2=Read, 3=Write, 4=Control
	permissionLevel: { type: Number, default: 0 },
	firstSeen: { type: Date, default: Date.now },
	lastSeen: { type: Date, default: Date.now },
	auth: [
		{
			token: String,
			issueDate: { type: Date, default: Date.now },
			validUntil: { type: Date, default: new Date(date.setMonth(date.getMonth() + 1)) },
			sourceIP: String,
		},
	],
	previousCommands: [String], // Limit 5
	lastTopic: String,
	subscribedToLoreUpdates: { type: Boolean, default: false },
});

const serverSchema = new Schema({
	serverID: Number,
	title: String,
	iconURL: String,
	joinDate: { type: Date, default: Date.now },
	auth: [
		{
			token: String,
			issueDate: { type: Date, default: Date.now },
			validUntil: { type: Date, default: new Date(date.setMonth(date.getMonth() + 1)) },
			sourceIP: String,
		},
	],
});

const topicSchema = new Schema({
	topic: String,
	displayName: String,
	dateAdded: { type: Date, default: Date.now },
	lastModified: { type: Date, default: Date.now },
    children: [Topic]
});

const User = model("User", userSchema);
const Server = model("Server", serverSchema);
const Topic = model("Topic", topicSchema);

module.exports.User = User;
module.exports.Server = Server;
module.exports.Topic = Topic;
