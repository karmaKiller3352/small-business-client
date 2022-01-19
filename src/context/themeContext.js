import React from 'react';
import { LIGHT_THEME } from '../constants/theme';
import themes from '../themes';

export default ThemeContext = React.createContext({
  theme: themes[LIGHT_THEME],
  themName: LIGHT_THEME,
  toggleTheme: () => {
    console.log('ThemeProvider is not rendered!');
  },
});

export const useTheme = () => React.useContext(ThemeContext);
