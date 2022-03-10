import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";

import reducer from "./reducers";
import App from "./App";
import "./index.css";

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {" "}
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
