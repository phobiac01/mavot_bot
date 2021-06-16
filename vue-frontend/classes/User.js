export class User {
  constructor(disp, pass) {
    this.displayName = disp;
    this.password = pass;
    this.activeSession = false;
  }

  login(pass) {
    if (this.activeSession) return false;
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
