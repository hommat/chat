import React from 'react';

import Message from './Message';
import { useMessages } from '../context/messages';

function MessageList() {
  const { messages } = useMessages();

  return (
    <div>
      {messages.map(({ id, text, username }) => (
        <Message key={id} text={text} username={username} />
      ))}
    </div>
  );
}

export default MessageList;
