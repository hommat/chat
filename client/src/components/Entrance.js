import React, { useState } from 'react';

import { useSettings } from '../context/settings';

function Entrance() {
  const { setSettings, settings } = useSettings();
  const [values, setValues] = useState({
    username: settings.username,
    room: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={values.username}
      />
      <input
        type="text"
        name="room"
        onChange={handleChange}
        value={values.room}
      />
      <button type="submit" />
    </form>
  );
}

export default Entrance;
