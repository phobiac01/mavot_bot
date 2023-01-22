const mongoose = require("mongoose");
console.log(":: " + (process.env.PRODUCTION) ? "PROD" : "NOT PROD");
//FIXME: Fix PORD / DEV env detection


// ==== Make a connection to the database ====================
global.mongoose = require("mongoose");
global.dburl = process.env.PRODUCTION
  ? "mongodb://db:27017/mavot"
  : "mongodb://localhost:27017/mavot-test;";
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });


// ==== Entry point. Launches the bot, api, and webserver ==================
// Delay for connection to be established, then handle possible issues if needed
setTimeout(() => {
  if(mongoose.connection.readyState == 1) {
      console.log(":: Database connection established");
      launchPrograms();
  } else {
      process.stdout.write("Connecting to database . ");
      handleDBConenctionWait();
  }
}, 500);

// Check DB connection state every half second until failure or success
let attempts = 0;
function handleDBConenctionWait() {
  attempts++;
  if(attempts > 12) {
      process.stdout.write('\n');
      console.error(new Error("Could not establish connection to database, exiting..."));
      process.exit(1);
  }

  if(mongoose.connection.readyState == 1) {
      process.stdout.write('\n');
      console.log(":: Conenction established!");
      launchPrograms();

  } else {
      setTimeout(() => {
          process.stdout.write('. ');
          handleDBConenctionWait();
      }, 500);
  }
}

function launchPrograms() {
  require('./source/api');
  require('./source/bot');
  
  // TODO: Add React dev server launcher or production file replacement / installer
  /*
    If launched in dev mode the react server will launch without a docker container
    If launched in production mode a script will be run to install the updated code under var/www/mavotweb.de/html
    This will have to be handled either in docker_compose as an environment setup script
    or via a manual script to be run in the root project directory (ie: 'install_react_changes.sh')
  */
}

// ==== Cleanup and closure handling =================
// TODO: Put in proper DB closure handling with 5000ms timeout
process.on('exit', () => {
  if(mongoose.connection.readyState == 1) {
    mongoose.disconnect();
    console.log(':: DB Disconnect ~');
  }
});
