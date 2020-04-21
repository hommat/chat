import React from 'react';

import User from './User';
import { useRoom } from '../context/room';

function UserList() {
  const { users } = useRoom();

  return (
    <div>
      {users.map((user) => (
        <User key={user} username={user} />
      ))}
    </div>
  );
}

export default UserList;
