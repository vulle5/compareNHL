import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors/";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0d47a1"
    },
    secondary: red
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#90caf9"
    },
    secondary: red,
    action: {
      selected: "#90caf9"
    }
  }
});
