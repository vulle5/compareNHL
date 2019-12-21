import { lightTheme, darkTheme } from '../styles/themes';

// Matches needs to be at some point a boolean value otherwise
// theme is always going to be 'auto'
export const setTheme = (theme, matches) => {
  if (theme === 'auto' || typeof matches === 'undefined') {
    localStorage.setItem('theme', 'auto');
    const data = matches
      ? { ...darkTheme, themeType: 'auto' }
      : { ...lightTheme, themeType: 'auto' };
    return {
      type: 'SET_THEME',
      data
    };
  }
  localStorage.setItem('theme', theme);
  const data =
    theme === 'dark'
      ? { ...darkTheme, themeType: 'dark' }
      : { ...lightTheme, themeType: 'light' };
  return {
    type: 'SET_THEME',
    data
  };
};

const themeReducer = (state = lightTheme, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return action.data;
    default:
      return state;
  }
};

export default themeReducer;
