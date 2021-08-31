export class User {
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
