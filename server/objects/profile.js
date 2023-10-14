class Profile {
  constructor(name, username) {
    this.name = name;
    this.username = username;
  }

  friends = new Set(); //danh sách bạn bè

  addFriend(profile) {
    this.friends.add(profile);
    profile.addFriend(this);
  }

  removeFriend(profile) {
    this.friends.removeFriend(profile);
    profile.removeFriend(this);
  }
}
