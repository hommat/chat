import React, { useState } from 'react';

import { useSettings } from '../context/settings';
import { post } from '../utils/http';

function Entrance() {
  const { updateSettings, settings } = useSettings();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: settings.username,
    room: '',
  });

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await post('http://localhost:4000/enter', values);
    const postErrors = await res.json();
    if (Object.keys(postErrors).length > 0) setErrors(postErrors);
    else updateSettings(values);
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
      <p>{errors.username}</p>
      <input
        type="text"
        name="room"
        placeholder="room"
        onChange={handleChange}
        value={values.room}
      />
      <p>{errors.room}</p>
      <button type="submit">Enter room</button>
    </form>
  );
}

export default Entrance;
