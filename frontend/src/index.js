import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import configureStore from "./redux/configureStore";
import "./index.css";

const { store, persistor } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename={process.env.PUBLIC_URL}>
        {" "}
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
