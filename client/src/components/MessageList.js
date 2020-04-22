import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import Message from './Message';
import { useMessages } from '../context/messages';

const SRoot = styled.div`
  margin: 1rem 0;
  padding: 0 0.4rem;
  height: 350px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

function MessageList() {
  const listRef = useRef();
  const { messages } = useMessages();

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <SRoot ref={listRef}>
      {messages.map(({ id, text, username }) => (
        <Message key={id} text={text} username={username} />
      ))}
    </SRoot>
  );
}

export default MessageList;
