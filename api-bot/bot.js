const { prodToken, owners, invoker } = require("./botconfig");
const { extrap } = require("./extrapolatorEngine");
const mongoose = require("mongoose");

// const Drekir = mongoose.model('Drek', { name: String });
// const drek = new Drekir({ name: 'Zildjian' });
// drek.save();

// ==== DiscordJS =================================================
const Discord = require("discord.js");
const bot = new Discord.Client();
const botStart = new Date();

bot
	.login(prodToken)
	.then(() => {
		bot.user.setPresence({
			activity: {
				name: invoker + "help",
				type: "LISTENING",
				url: "https://bluedragon.dev",
			},
		});

		console.log(`] Logged in as ${bot.user.tag}`);
	})
	.catch((err) => console.error(err));

bot.on("error", (err) => {
	console.error("] DiscordERR: ", err);
});

// ==== Bot Logic =================================================
bot.on("message", (message) => {
	const sender = message.author;
	const channel = message.channel;
  var messageContent = message.content;
	const hasInvoker = messageContent.startsWith(invoker);
	const now = new Date();

	// Ignore message if sender is a bot
	if (sender.bot) return;

	// Ignore message if it's not a dm and doesnt have an invoker
	if (!hasInvoker && channel.type != "dm") return;

	// If invoker, remove it
	if (hasInvoker) messageContent = messageContent.replace(invoker, "");

	console.log(`] ${message.author.username}:`, message.content);

	messageContent = messageContent.trim();

	const args = messageContent.split(/ +/);
	const command = args.shift().toLowerCase();

	// Save current query to the Users file as last interaction
	// Match it against last bot message to see if its a response/action event

  // TODO: Run an experiment on switch-case to see which is more efficient

	switch (command) {
		case "extrap":
			extrap(sender, command, channel, bot);
			break;

		case "hi":
		case "hiya":
		case "hello":
		case "sup":
		case "yo":
		case "henlo":
		case "heyo":
		case "hey":
			channel.send("Hi there. How may I be of assistance?");
			break;

		case "xd":
		case "lmao":
    case 'lmaoo':
    case 'lmaooo':
		case "lol":
		case "lmfao":
    case 'lmfaoo':
    case 'lmfaooo':
		case "x3":
			channel.send("I see that you have found my response amusing ~");
			break;

		default:
			channel.send(
				"Command not found: < " +
					command +
					" > [ " +
					args +
					' ]\nTry typing "help" to see some non-imaginary commands ~'
			);
			break;
	}
});
