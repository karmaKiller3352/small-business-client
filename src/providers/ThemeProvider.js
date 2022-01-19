import React, { useState } from 'react';
import ThemeContext from '../context/themeContext';
import { LIGHT_THEME, DARK_THEME } from '../constants/theme';
import themes from '../themes';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_THEME); // TO DO: add later here fetching theme from user settings
  const toggleTheme = () =>
    theme === LIGHT_THEME ? setTheme(DARK_THEME) : setTheme(LIGHT_THEME);

  return (
    <ThemeContext.Provider
      value={{ theme: themes[theme], toggleTheme, themeName: theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
