const { prodToken , devToken , owners } = require('./botconfig');
var { invoker } = require('./botconfig');
const lore = require('./lore');

// Use development invoker and token if not in production
function checkEnvironment() {
    if (process.argv[2] === "prod") {
        return prodToken;
    } else {
        invoker = "_";
        return devToken;
    }
}

const Discord = require("discord.js");
const bot = new Discord.Client();
var botStart = new Date();
bot.login(checkEnvironment())
  .then(() => {
    botStart = new Date();
    bot.user.setStatus('online');
    bot.user.setPresence({
      activity: {
          name: invoker + 'help',
          type: "LISTENING",
          url: "https://bluedragon.dev",
      }
    });

    console.log(`Logged in as ${bot.user.tag}`);
  })
  .catch((err) => console.error(err));
bot.on('error', (err) => {console.error("DiscordERR: ", err)});





bot.on('message', message => {
    var messageContent = message.content;
    var sender = message.author;
    var channel = message.channel;
    var now = new Date();

    var hasInvoker = messageContent.startsWith(invoker);

    // Ignore message if sender is a bot
    if (sender.bot) return;
    // Ignore message if its not a dm and doesnt have an invoker
    if (!hasInvoker && message.channel.type != "dm") return;

    console.log(message.content);

    // If invoker, remove it
    if(hasInvoker) {
        messageContent = messageContent.replace(invoker, '');
    }
    // the content of the message, without the invoker
    messageContent = messageContent.trim();
    
    const args = messageContent.split(/ +/);
    const command = args.shift().toLowerCase();
    
    switch (command) {
        case 'ping': {
            message.react('✅');
            message.channel.send("Pong!");
            break;
        }
        
        case 'hi':
        case 'hello':
        case 'hey':
        case 'sup':
        case 'yo': {
            message.channel.send("Hello. What information do you seek?");
            break;
        }

        case 'botsay': {
            if (owners.indexOf(sender.id) < 0) {
                message.channel.send("Sorry, you do not possess domain over my actions.");
                break;
            }

            var mentionedUser = message.mentions.users.first();
            if (mentionedUser) {
                var targetUser = bot.users.cache.get(mentionedUser.id);
                if (targetUser.bot) {
                    message.channel.send("I cannot send messages to bots. Sorry.");
                    break;
                }
                var relayMessage = messageContent.slice(command.length, messageContent.indexOf(' <')).trim()
                targetUser.send(relayMessage);
                message.channel.send("> Said: " + relayMessage + " to user " + targetUser.username);

            } else {
                mentionedUser = messageContent.substring(messageContent.indexOf('id:') + 3, messageContent.length).trim();
                var targetUser = bot.users.cache.get(mentionedUser);
                if(messageContent.indexOf('id:') < 0) {
                    message.channel.send("Please try again with a properly mentioned user or user ID");
                    break;
                }
                if (targetUser.bot) {
                    message.channel.send("I cannot send messages to bots. Sorry.");
                    break;
                }
                var relayMessage = messageContent.slice(command.length, messageContent.indexOf(' id:')).trim()
                targetUser.send(relayMessage);
                message.channel.send("> Said: " + relayMessage + " to user " + targetUser.username);
            }
            break;
        }

        case "whats":
        case "what's":
        case 'what': {
            if (args.includes("dragonscape") || (args.includes("dragon") && args.includes("scape"))) {
                channel.send("```" + lore.main.introduction + "```");

            } else if (args.includes("sivilao") || args.includes("sivilāo") || args.includes("silvao")) {
                channel.send("```" + lore.sivilao.introduction + "```");

            } else if (args.includes("balar") || args.includes("balār") || args.includes("baal") || args.includes("bal")) {
                channel.send("```" + lore.balar.introduction + "```");

            } else if (args.includes("drekir") || args.includes("drek") || args.includes("dreker")) {
                channel.send("```" + lore.drekir.introduction + "```");

            } else {
                channel.send("In not sure I understand your query...");
            }
            break;
        }
    
        default:
            message.channel.send("??!?!?!????!!?????!!!?!?");
            console.log("??");
            break;
    }
});