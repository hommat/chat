const Message = require('./Message');

class SystemMessage extends Message {
  constructor(text) {
    super(text, 'system');
  }
}

module.exports = SystemMessage;
