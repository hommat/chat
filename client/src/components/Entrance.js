import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import DisabledAutoInput from './DisabledAutoInput';
import { useSettings } from '../context/settings';
import { post } from '../utils/http';

const SRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const STitle = styled.h2`
  text-align: center;
  margin-bottom: 1.2rem;
  font-size: 1.7rem;
`;

const SForm = styled.form`
  width: 50%;
`;

const SErrorText = styled.p`
  color: red;
  margin-bottom: 0.7rem;
  margin-top: 0.3rem;
  font-size: 0.85rem;
  margin-left: 2px;
`;

const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.9rem;
`;

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
    <SRoot>
      <STitle>Enter room</STitle>
      <SForm onSubmit={handleSubmit}>
        <DisabledAutoInput
          type="text"
          name="username"
          placeholder="Username"
          hasError={errors.username}
          onChange={handleChange}
          value={values.username}
        />
        <SErrorText>{errors.username}</SErrorText>
        <DisabledAutoInput
          type="text"
          name="room"
          placeholder="Room"
          hasError={errors.room}
          onChange={handleChange}
          value={values.room}
        />
        <SErrorText>{errors.room}</SErrorText>
        <SButtonContainer>
          <Button type="submit">Enter</Button>
        </SButtonContainer>
      </SForm>
    </SRoot>
  );
}

export default Entrance;
