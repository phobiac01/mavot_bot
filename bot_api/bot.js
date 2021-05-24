const { prodToken, owners, invoker } = require("./botconfig");
// const lore = require('./lore');

console.log(process.env.PRODUCTION ? "PROD" : "NOT PROD");

// == Mongoose =====================================================
const mongoose = require("mongoose");

const dburl = process.env.PRODUCTION
  ? "mongodb://db:27017/mavot"
  : "mongodb://localhost:27017/mavot-test;";
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

// const Drekir = mongoose.model('Drek', { name: String });

// const drek = new Drekir({ name: 'Zildjian' });
// drek.save();

// == DiscordJS =====================================================
const Discord = require("discord.js");
const bot = new Discord.Client();
var botStart = new Date();
bot
  .login(prodToken)
  .then(() => {
    botStart = new Date();
    bot.user.setStatus("online");
    bot.user.setPresence({
      activity: {
        name: invoker + "help",
        type: "LISTENING",
        url: "https://bluedragon.dev",
      },
    });

    console.log(`Logged in as ${bot.user.tag}`);
  })
  .catch((err) => console.error(err));
bot.on("error", (err) => {
  console.error("DiscordERR: ", err);
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

  console.log("]", message.content);

  // If invoker, remove it
  if (hasInvoker) {
    messageContent = messageContent.replace(invoker, "");
  }
  // The content of the message, without the invoker
  messageContent = messageContent.trim();

  const args = messageContent.split(/ +/);
  const command = args.shift().toLowerCase();

  channel.send("lol bitch");
});
