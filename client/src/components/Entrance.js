import React, { useState } from 'react';
import styled from 'styled-components';

import DisabledAutoInput from './DisabledAutoInput';
import { useSettings } from '../context/settings';
import { post } from '../utils/http';

const SRoot = styled.div`
  display: flex;
  justify-content: center;
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
`;

const SButton = styled.button`
  background: red;
  border: 0;
  font-size: 1rem;
  padding: 0.5rem 1.6rem;
  margin-top: 0.7rem;
  border-radius: 10px;
  font-family: Roboto;
  background: ${(props) => props.theme.gradient.default};
  transition: ${(props) => props.theme.transition.default};
  box-shadow: 0px 0px 3px 1px ${(props) => props.theme.color.shadow};

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.color.shadow};
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    box-shadow: 0px 0px 20px 1px ${(props) => props.theme.color.shadow};
  }
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
          <SButton type="submit">Enter</SButton>
        </SButtonContainer>
      </SForm>
    </SRoot>
  );
}

export default Entrance;
