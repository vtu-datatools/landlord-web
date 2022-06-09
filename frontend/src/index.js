import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./redux/configureStore";
import "./index.css";

const store = configureStore();

render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      {" "}
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
