import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Entrance from './components/Entrance';
import Room from './components/Room';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import { SettingsProvider, SettingsContext } from './context/settings';

const SRoot = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.3rem;
  width: 100%;
  max-width: 450px;
  background: #252331;
  margin: 2rem;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 1px #252331;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SRoot>
        <SettingsProvider>
          <GlobalStyles />

          <SContent>
            <SettingsContext.Consumer>
              {({ settings }) =>
                settings.room && settings.username ? <Room /> : <Entrance />
              }
            </SettingsContext.Consumer>
          </SContent>
        </SettingsProvider>
      </SRoot>
    </ThemeProvider>
  );
}

export default App;
