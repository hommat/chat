import React, { useEffect } from 'react';
import io from 'socket.io-client';

import { useSettings } from '../context/settings';

const ENDPOINT = 'localhost:4000';

function Room() {
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    const socket = io(ENDPOINT);

    return () => socket.disconnect();
  }, []);

  function leaveRoom() {
    updateSettings({ room: '' });
  }

  return (
    <div>
      <h2>Room {settings.room}</h2>
      <button onClick={leaveRoom}>Leave room</button>
    </div>
  );
}

export default Room;
