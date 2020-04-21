import React from 'react';

import Entrance from './components/Entrance';
import Room from './components/Room';
import { SettingsProvider, SettingsContext } from './context/settings';

function App() {
  return (
    <SettingsProvider>
      <SettingsContext.Consumer>
        {({ settings }) =>
          settings.room && settings.username ? <Room /> : <Entrance />
        }
      </SettingsContext.Consumer>
    </SettingsProvider>
  );
}

export default App;
