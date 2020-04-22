import React from 'react';
import styled from 'styled-components';

const SButton = styled.button`
  background: red;
  border: 0;
  font-size: 1rem;
  padding: 0.5rem 1.6rem;
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

function Button(props) {
  return <SButton {...props} />;
}

export default Button;
