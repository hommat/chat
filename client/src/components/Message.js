import React from 'react';

function Message({ text, username }) {
  return (
    <div>
      {username}: {text}
    </div>
  );
}

export default Message;
