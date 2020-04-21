const { v4 } = require('uuid');

class SystemMessage {
  constructor(text) {
    this.id = v4();
    this.text = text;
    this.username = 'system';
  }
}

module.exports = SystemMessage;
