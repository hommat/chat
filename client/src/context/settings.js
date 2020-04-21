import React, { createContext, useContext, useState } from 'react';

export const SettingsContext = createContext({});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({ username: '', room: '' });
  const contextValue = { settings, setSettings };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const settings = useContext(SettingsContext);

  return settings;
}
