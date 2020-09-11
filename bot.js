const { prodToken , devToken , owners } = require('./botconfig');
var { invoker } = require('./botconfig');

// Use development invoker and token if not in production
function checkEnvironment() {
    if (process.argv[2] === "production") {
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
          type: "PLAYING",
          url: "https://bluedragon.dev/bbot2",
      }
    });

    console.log(`Logged in as ${bot.user.tag}`);
  })
  .catch((err) => console.error(err));
bot.on('error', (err) => {console.error("DiscordERR: ", err)});



bot.on('message', message => {
    var messageContent = message.content;
    var sender = message.author;
    var now = new Date();

    var firstBits = messageContent.substring(0, invoker.length);

    // Ignore message if sebder is a bot
    if (sender.bot) return;
    // Ignore message if its not a dm and doesnt have an invoker
    if (firstBits != invoker && message.channel.type != "dm") return;

    console.log(message.content);

    // If invoker, remove it
    if(firstBits === invoker) {
        messageContent = messageContent.replace(invoker, '');
    }
    messageContent = messageContent.trim();
    
    const args = messageContent.split(/ +/);
    const command = args.shift().toLowerCase();
    
    switch (command) {
        case 'hi':
        case 'hello':
        case 'hey':
        case 'yo': {
            message.channel.send("Hello. What information do you seek?");
            break;
        }

        // replace with regex expressions
        // function parseId(rawstring) {
        //     let obj = [
        //       /([0-9]{18})/,
        //       /<@!*([0-9]{18})>/
        //     ];
          
        //     let resp = null;
          
        //     for (var index in obj) {
        //       if (obj.hasOwnProperty(index)) {
        //           let test = rawstring.match(obj[index]);
        //           console.log(test);
        //           if (test) {
        //             console.log("found match.")
        //             return test[1];
        //             break;
        //           }
        //       }
        //     }
        //     throw "couldn't resolve userid";
        //   }
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

        case 'ping':
            message.channel.send("Pong!");
            break;
    
        default:
            //message.channel.send("??!?!?!????!!?????!!!?!?");
            console.log("??");
            break;
    }
});