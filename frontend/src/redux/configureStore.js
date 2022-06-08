import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

function configureStore(initialState) {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === "production") {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
  } else {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    );
  }
}

export default configureStore;
