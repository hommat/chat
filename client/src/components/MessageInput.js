import React, { useState } from 'react';

import { useRoom } from '../context/room';

function MessageInput() {
  const { sendMessage } = useRoom();
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
