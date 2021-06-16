class User {
    constructor(disp, pass) {
        this.displayName = disp;
        this.password = pass;
        this.activeSession = false;
    }

    login(pass) {
        if(this.activeSession) return false;
        if (pass == this.password) {
            this.activeSession = true;
            return true;
        } else return false;
    }

    logout() {
        if (this.activeSession) {
            this.activeSession = false;
            return true;
        } else return false;
    }
}

var app = new Vue({
	el: "#app",
	data: {
        appName: "Mavot Web Interface",
        user: new User("Bluedev", "Passwd123"),
        loginPasswordField: "No Password Yet",
	},
});

function updateLoginPassFormValue(newValue) {
    app.loginPasswordField = newValue;
}

function logMeInHamachi() {
    if(app.user.login(app.loginPasswordField)) alert("Login Successful")
    else alert("Login failed")
}

function logMeOutHamachi() {
    if(!app.user.logout()) alert("Log Out failed")
}