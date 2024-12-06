import React, {createContext, useState, useContext, ReactNode} from 'react';
import lightModeTheme from '../theme/LightModeTheme';
import darkModeTheme from '../theme/DarkModeTheme';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: typeof darkModeTheme | typeof lightModeTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = darkMode ? darkModeTheme : lightModeTheme;

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode, theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
