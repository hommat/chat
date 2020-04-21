import React, { useState } from 'react';

import { useSettings } from '../context/settings';

function Entrance() {
  const { updateSettings, settings } = useSettings();
  const [values, setValues] = useState({
    username: settings.username,
    room: '',
  });

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateSettings(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={values.username}
      />
      <input
        type="text"
        name="room"
        placeholder="room"
        onChange={handleChange}
        value={values.room}
      />
      <button type="submit">Enter room</button>
    </form>
  );
}

export default Entrance;
