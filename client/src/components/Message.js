import React from 'react';
import styled from 'styled-components';

import { useSettings } from '../context/settings';

const SRoot = styled.div`
  background: ${(props) =>
    props.isAuthor ? props.theme.gradient.default : '#323043'};
  padding: 0.5rem 0.7rem;
  margin-bottom: 0.5rem;
  align-self: ${(props) => (props.isAuthor ? 'flex-end' : 'flex-start')};
  border-radius: 13px;
  font-size: 0.96rem;
`;

function Message({ text, username }) {
  const { settings } = useSettings();
  const isAuthor = username === settings.username;

  return (
    <SRoot isAuthor={isAuthor}>
      {username}: {text}
    </SRoot>
  );
}

export default Message;
