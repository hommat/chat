import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useSettings } from '../context/settings';
import { MessagesProvider } from '../context/messages';

const STopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const STitle = styled.h2`
  font-size: 1.7rem;
`;

function Room() {
  const { settings, updateSettings } = useSettings();

  function leaveRoom() {
    updateSettings({ room: '' });
  }

  return (
    <div>
      <MessagesProvider>
        <STopBar>
          <STitle>Room {settings.room}</STitle>
          <Button onClick={leaveRoom}>Leave</Button>
        </STopBar>

        <MessageList />
        <MessageInput />
      </MessagesProvider>
    </div>
  );
}

export default Room;
