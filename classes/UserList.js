class UserList {
  constructor() {
    this.users = [];
  }

  isUsernameAlreadyInRoom(username, room) {
    return this.users.find((u) => u.username === username && u.room === room);
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  getUsernamesInRoom(room) {
    return this.users
      .filter((user) => user.room === room)
      .map((user) => user.username);
  }
}

module.exports = UserList;
