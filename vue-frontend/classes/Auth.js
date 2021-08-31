import { Error } from "mongoose";

export class AuthModule {
  constructor() {
    // Attempt to import session details from local storage
    this.token = localStorage.token | null;
    this.activeUserID = localstorage.activeUserID | null;
    
    // Check to see if retrieved token is still valid
    if(this.token) this.activeSession = await this.verifySession();
    else this.activeSession = false;

    console.log("> Global Auth manager initialized."); 
    console.log("Testing of vue globals", app.appName);
  }

  // Check with the server to see if the current token is still valid
  async verifySession() {
    let headers = {};
    if (this.token) headers = { 'Authorization': this.token }
    else return false;

    await fetch("/api/authState", {headers: headers})
      .then((res) => {
        if (res.status == 200) return true; //res.text();
        else return false;
      })
      .catch(console.error);
  }

  async login(formDetails) {
    if(this.activeSession) {
      return new Error("You are already logged in.");

    } else {
      // Send POST request to the server
      // Save the resulting token json to local storage
      fetch("/api/login", {})
        .then((res) => res.json())
        .then((data) => localStorage.setItem({token: data.token}));
    }
  }

  async logout() {
    if(!this.activeSession) {
      return new Error("You are already logged out.");

    } else {
      // Send logout request to the server and delete local token
      let headers = { 'Authorization': this.token };

      fetch("api/logout", {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          this.activeSession = false;
          this.activeUserID = null;
          this.token = null;
          localStorage.setItem({token: null, activeUserID: null});
          return true;

        } else return new Error(res.statusText);
      })
    }
  }
}
