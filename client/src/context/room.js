import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import io from 'socket.io-client';

import { useSettings } from './settings';

export const RoomContext = createContext({});

export function RoomProvider({ children }) {
  const socket = useRef();
  const { settings, updateSettings } = useSettings();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.current = io('localhost:4000');

    socket.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on('updateUsers', (users) => {
      setUsers(users);
    });

    socket.current.emit('joinRoom', settings, () => {
      updateSettings({ room: '' });
    });

    return () => socket.current.disconnect();
  }, [settings, updateSettings]);

  function sendMessage(message) {
    socket.current.emit('sendMessage', message);
  }

  return (
    <RoomContext.Provider value={{ messages, users, sendMessage }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const room = useContext(RoomContext);

  return room;
}
