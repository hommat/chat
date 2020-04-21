import React from 'react';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useSettings } from '../context/settings';
import { MessagesProvider } from '../context/messages';

function Room() {
  const { settings, updateSettings } = useSettings();

  function leaveRoom() {
    updateSettings({ room: '' });
  }

  return (
    <div>
      <h2>Room {settings.room}</h2>
      <button onClick={leaveRoom}>Leave room</button>
      <MessagesProvider>
        <MessageList />
        <MessageInput />
      </MessagesProvider>
    </div>
  );
}

export default Room;
