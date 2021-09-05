// import mongoose from "mongoose";
// const { Schema } = mongoose;
const Discord = require("discord.js");
const bot2 = new Discord.Client();

module.exports.extrap = function(messageAuthor, command, channel) {
    console.log(global.mongoose.connection.readyState);
    console.log(messageAuthor, command);
    channel.send("Returned from extrapolator! 👍");
    console.log("Extrapolator engine has been run ~");
}