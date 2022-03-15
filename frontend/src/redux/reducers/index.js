import {
  UPDATE_TEXTINPUT,
  REQUEST_GEOCODE_RESULTS,
  RECEIVE_GEOCODE_RESULTS,
  UPDATE_CENTER,
} from "../../actions/actions";

import { combineReducers } from "redux";

// these are our initial isochrones settings
const initialIsochronesControlsState = {
  userInput: "",
  geocodeResults: [],
  isochrones: {
    results: [],
  },
  isFetching: false,
  isFetchingIsochrones: false,
  settings: {
    isochronesCenter: {},
    range: {
      max: 500,
      value: 60,
    },
    interval: {
      max: 60,
      value: 10,
    },
    mode: "car",
    rangetype: "distance",
    traffic: "disabled",
  },
};

// our reducer constant returning an unchanged or updated state object depending on the users action, many will follow
const isochronesControls = (state = initialIsochronesControlsState, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_TEXTINPUT:
      return {
        ...state,
        userInput: action.payload.inputValue,
      };
    // let the app know the request is being made (for our spinner)
    case REQUEST_GEOCODE_RESULTS:
      return {
        ...state,
        isFetching: true,
      };
    // when results are returned by the API update the state with addresses and let the app know it is no longer fetching
    case RECEIVE_GEOCODE_RESULTS:
      return {
        ...state,
        geocodeResults: action.results,
        isFetching: false,
      };
    // update the isochronesCenter we will use later from the coordinates of the selected address
    case UPDATE_CENTER:
      return {
        ...state,
        settings: {
          ...state.settings,
          isochronesCenter: action.isochronesCenter,
        },
      };

    default:
      return state;
  }
};

// creates a root reducer and combines different reducers if needed
const rootReducer = combineReducers({
  isochronesControls,
});

export default rootReducer;
