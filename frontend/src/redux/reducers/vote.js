import {
  FETCH_VOTE_OPTIONS_REQUEST,
  FETCH_VOTE_OPTIONS_SUCCESS,
  FETCH_VOTE_OPTIONS_FAILURE,
} from "../actions/types";

const initialState = {
  isLoading: false,
  voteOptions: null,
  error: null,
};

const options = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOTE_OPTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VOTE_OPTIONS_SUCCESS:
      console.log("in reducer!");
      console.log(action);
      return {
        isLoading: false,
        voteOptions: action.voteOptions,
        error: null,
      };
    case FETCH_VOTE_OPTIONS_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};

export default options;
