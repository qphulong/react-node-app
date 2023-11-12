export class CurrentUser {
  userId = "";
  isContentModerator = null;

  set(userId, isContentModerator) {
    this.userId = userId;
    this.isContentModerator = isContentModerator;
  }
}
