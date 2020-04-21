class UserList {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUser(id) {
    this.users.filter((user) => user.id !== id);
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
