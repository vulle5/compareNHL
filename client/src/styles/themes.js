import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#0d47a1'
      },
      secondary: {
        main: '#ff1744',
        light: '#ff616f',
        dark: '#c4001d',
        contrastText: '#fff'
      }
    }
  })
);

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#90caf9'
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000'
      },
      action: {
        selected: '#90caf9'
      }
    }
  })
);
