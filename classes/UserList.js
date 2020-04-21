class UserList {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    const userAlreadyInRoom = this.users.find(
      (u) => u.username === user.username && u.room === user.room
    );

    if (userAlreadyInRoom) return 'User already in room.';
    else this.users.push(user);
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
