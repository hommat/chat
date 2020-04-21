import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import io from 'socket.io-client';

import { useSettings } from './settings';

const ENDPOINT = 'localhost:4000';

export const MessagesContext = createContext({});

export function MessagesProvider({ children }) {
  const socket = useRef();
  const { settings, updateSettings } = useSettings();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
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
    <MessagesContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const messages = useContext(MessagesContext);

  return messages;
}
