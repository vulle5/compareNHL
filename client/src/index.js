import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors/";

import App from "./components/App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d47a1"
    },
    secondary: red
  }
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};

render();
store.subscribe(render);
