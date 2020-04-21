import React, { createContext, useContext, useState } from 'react';

export const SettingsContext = createContext({});

function getSettingsFromLocalStorage() {
  const username = localStorage.getItem('username') || '';
  const room = localStorage.getItem('room') || '';

  return { username, room };
}

function setLocalStorageSettings(settings) {
  localStorage.setItem('username', settings.username);
  localStorage.setItem('room', settings.room);
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(getSettingsFromLocalStorage());

  function updateSettings(overrideSettings) {
    const newSettings = { ...settings, ...overrideSettings };
    setSettings(newSettings);
    setLocalStorageSettings(newSettings);
  }

  const contextValue = { settings, updateSettings };

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
