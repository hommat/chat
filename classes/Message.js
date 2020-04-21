const { v4 } = require('uuid');

class Message {
  constructor(text, username) {
    this.id = v4();
    this.text = text;
    this.username = username;
  }
}

module.exports = Message;
