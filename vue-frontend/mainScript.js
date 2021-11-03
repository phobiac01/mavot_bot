const apiURL = "http://localhost:3030";

class AuthModule {
	constructor() {
		// Attempt to import session details from local storage
		this.token = localStorage.token | null;
		this.activeSession = false;

		// Check to see if retrieved token is still valid
		this.verifySession();

		console.log("> Global auth manager initialized.");
	}

	// Check with the server to see if the current token is still valid
	verifySession() {
		let headers = {};
		if (this.token) headers = { Authorization: this.token };
		else return false;

		fetch(apiURL + "/api/authState", { headers: headers })
			.then((res) => {
				if (res.status == 200) {
					this.activeSession = true;
					return res.json();
				} else {
					this.activeSession = false;
                    throw new Error(res.statusText);
				}
			})
			.then((data) => {
				console.log(JSON.stringify(data));
				app.activeUser = new User(data.userID, data.displayName, data.avatarURL);
			})
			.catch(console.error);
	}

	// TODO: Implement login form submission logic
	login(formDetails) {
		if (this.activeSession) {
			return new Error("You are already logged in.");
		} else {
			// Send POST request to the server
			// Save the resulting token json to local storage
			fetch(apiURL + "/api/login", {})
				.then((res) => {
					if (res.status == 200) {
						return res.json();
					} else {
						return;
					}
				})
				.then((data) => localStorage.setItem({ token: data.token }));
		}
	}

	logout() {
		if (!this.activeSession) {
			return new Error("You are already logged out.");
		} else {
			// Send logout request to the server and delete local token
			let headers = { Authorization: this.token };

			fetch(apiURL + "api/logout", { headers: headers }).then((res) => {
				if (res.status == 200) {
					this.activeSession = false;
					this.token = null;
					app.activeUser = null;
					localStorage.setItem({ token: null });
					return true;
				} else return new Error(res.statusText);
			});
		}
	}
}

// ============================================================================
// ============================================================================

class User {
	constructor(userID, displayName, avatarURL) {
		this.userID = userID;
		this.displayName = displayName;
		this.avatarURL = avatarURL;
	}

	updateDisplayName(newDisplayName) {
		// Send UPDATE request to API
	}

	updateAvatar(localResourceURI) {
		// Send UPDATE request to API
	}
}

// ============================================================================
// ============================================================================

var app = new Vue({
	el: "#app",
	data: {
		appName: "Mavot Web Interface",
		auth: new AuthModule(),
		activeUser: null, // handled within the AUTH module
	},

	methods: {
		demoMethod: function () {
			if (this.auth.activeSession) console.log("Lol beef ~");
		},
	},
});
