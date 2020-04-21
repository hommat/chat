import React from 'react';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import { useSettings } from '../context/settings';
import { RoomProvider } from '../context/room';

function Room() {
  const { settings, updateSettings } = useSettings();

  function leaveRoom() {
    updateSettings({ room: '' });
  }

  return (
    <div>
      <RoomProvider>
        <h2>Room {settings.room}</h2>
        <button onClick={leaveRoom}>Leave room</button>

        <MessageList />
        <MessageInput />
        <UserList />
      </RoomProvider>
    </div>
  );
}

export default Room;
