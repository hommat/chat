import React from 'react';

import Message from './Message';
import { useRoom } from '../context/room';

function MessageList() {
  const { messages } = useRoom();

  return (
    <div>
      {messages.map(({ id, text, username }) => (
        <Message key={id} text={text} username={username} />
      ))}
    </div>
  );
}

export default MessageList;
