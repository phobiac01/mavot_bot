const { prodToken, owners, invoker } = require("./botconfig");
const mongoose = require("mongoose");

// const Drekir = mongoose.model('Drek', { name: String });
// const drek = new Drekir({ name: 'Zildjian' });
// drek.save();

// == DiscordJS =====================================================
const Discord = require("discord.js");
const bot = new Discord.Client();
var botStart = new Date();

bot.login(prodToken)
  .then(() => {
    bot.user.setPresence({
      activity: {
        name: invoker + "help",
        type: "LISTENING",
        url: "https://bluedragon.dev",
      },
    });

    console.log(`> Logged in as ${bot.user.tag}`);
  })
  .catch((err) => console.error(err));

bot.on("error", (err) => {
  console.error("> DiscordERR: ", err);
});


// == Bot Logic =====================================================
bot.on("message", (message) => {
  var messageContent = message.content;
  var sender = message.author;
  var channel = message.channel;
  var now = new Date();

  var hasInvoker = messageContent.startsWith(invoker);

  // Ignore message if sender is a bot
  if (sender.bot) return;
  // Ignore message if its not a dm and doesnt have an invoker
  if (!hasInvoker && message.channel.type != "dm") return;

  console.log(`> ${message.author.username}:`, message.content);

  // If invoker, remove it
  if (hasInvoker) {
    messageContent = messageContent.replace(invoker, "");
  }
  // The content of the message, without the invoker
  messageContent = messageContent.trim();

  const args = messageContent.split(/ +/);
  const command = args.shift().toLowerCase();

  // Save current query to the Users file as last interaction
  // Match it against last bot message to see fi its a response/action event

  switch(command) {
    case 'hi':
    case 'hiya':
    case 'hello':
    case 'sup':
    case 'yo':
    case 'henlo':
    case 'heyo':
    case 'hey':
      channel.send("Hi there. How may I be of assistance?");
      break;

    case 'xd':
    case 'lmao':
    case 'lol':
    case 'lmfao':
    case 'x3':
      channel.send("I see you have found that amusing ~");
      break;

    default:
      channel.send("Command not found: << " + command + " >> [ " + args + " ]", 'Try typing "help" for some non-imaginary commands ~');
      break;
  }
});
