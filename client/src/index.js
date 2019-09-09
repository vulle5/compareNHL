import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

// Polyfills
import smoothscroll from "smoothscroll-polyfill";

import App from "./components/App";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

smoothscroll.polyfill();
render();
store.subscribe(render);
