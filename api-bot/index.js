const mongoose = require("mongoose");


console.log(process.env.PRODUCTION ? "PROD" : "NOT PROD");


// ==== Make a connection to the database ====================
global.mongoose = require("mongoose");
global.dburl = process.env.PRODUCTION
  ? "mongodb://db:27017/mavot"
  : "mongodb://localhost:27017/mavot-test;";
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });


// Entry point. Launches the bot, api, and webserver
require('./api.js');
require('./bot.js');


// TODO: Put in proper DB closure handling with 5000ms timeout
process.on('exit', () => {
    mongoose.disconnect();
});