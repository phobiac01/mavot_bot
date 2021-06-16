import { User } from "./classes/User.js";

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
    user: new User("Bluedev", "Passwd123"),
    loginPasswordField: "No Password Yet",
  },

  methods: {
    logMeInHamachi: function () {
      if (this.user.login(this.loginPasswordField)) {
        this.loginPasswordField = "";
        alert("Login Successful");
      } else alert("Login failed");
    },
    logMeOutHamachi: function () {
      if (!this.user.logout()) alert("Log Out failed");
    },
  },
});
