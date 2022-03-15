import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./redux/configureStore";
import "./css/index.css";

const store = configureStore();

render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        {" "}
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
