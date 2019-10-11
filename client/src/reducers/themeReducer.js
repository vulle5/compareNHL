import { lightTheme, darkTheme } from '../styles/themes';

export const setTheme = theme => {
  localStorage.setItem('theme', theme);
  return {
    type: 'SET_THEME',
    data: theme === 'dark' ? darkTheme : lightTheme
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
