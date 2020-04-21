import React, { useState } from 'react';

import { useMessages } from '../context/messages';

function MessageInput() {
  const { sendMessage } = useMessages();
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (message.trim().length > 0) {
      sendMessage(message);
      setMessage('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        onChange={handleChange}
        value={message}
      />
    </form>
  );
}

export default MessageInput;
