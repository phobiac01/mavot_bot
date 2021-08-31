import { User } from "./classes/User.js";
import { AuthModule } from "./classes/Auth.js";


/* =================================
   IN ORDER FOR IMPORTS TO WORK CORRECTLY
   THIS MUST BE SERVED UP BY A WEBSERVER
   GO TO ../api-bot AND RUN webserver.js
   TO CONTINUE. DO NOT OPEN LOCAL FILE
*/


var app = new Vue({
  el: "#app",
  data: {
    appName: "Mavot Web Interface",
    auth: new AuthModule(),
    user: null, // handled within the AUTH module
    loginPasswordField: "No Password Yet",
  },

  methods: {
    demoMethod: function() {
      if (this.auth.activeSession)
        console.log("Lol beef ~");
    }
  },
});
