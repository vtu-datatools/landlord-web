import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState) {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === "production") {
    let store = createStore(
      persistedReducer,
      initialState,
      applyMiddleware(thunk)
    );
    let persistor = persistStore(store);
    return { store, persistor };
  } else {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    let store = createStore(
      persistedReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    );
    let persistor = persistStore(store);
    return { store, persistor };
  }
}

export default configureStore;
