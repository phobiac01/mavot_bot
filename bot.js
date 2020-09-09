const { botToken , owners , invoker } = require('./botconfig');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.author.bot || !message.content.toLowerCase().startsWith(invoker)) return;
    const args = message.content.slice(invoker.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    
    switch (command) {
        case 'ping':
            message.channel.send("Pong!");
            break;
    
        default:
            message.channel.send("??!?!?!????!!?????!!!?!?");
            break;
    }
});

client.login(botToken);