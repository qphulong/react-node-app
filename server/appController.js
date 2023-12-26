class CurrentUser {
  userId = "";
  isContentModerator = null;

  CurrentUser() {
    this.userId = "";
    this.isContentModerator = False;
  }

  set(userId, isContentModerator) {
    this.userId = userId;
    this.isContentModerator = isContentModerator;
  }
}

module.exports = {
  CurrentUser,
};
