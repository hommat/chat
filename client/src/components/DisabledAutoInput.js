import React from 'react';
import styled from 'styled-components';

const SInput = styled.input`
  background: #1e1c26;
  font-size: 0.85rem;
  border: 0;
  padding: 0.9rem;
  border-radius: 10px;
  width: 100%;
  transition: ${(props) => props.theme.transition.default};
  ${(props) =>
    props.hasError && 'box-shadow: 0px 0px 5px 1px rgba(255, 0, 0, 0.77);'}

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.color.shadow};
  }

  &::placeholder {
    color: #5e6079;
  }
`;

function DisabledAutoInput(props) {
  return (
    <SInput
      {...props}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
}

export default DisabledAutoInput;
