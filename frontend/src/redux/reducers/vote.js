import {
  FETCH_VOTE_QUESTION_REQUEST,
  FETCH_VOTE_QUESTION_SUCCESS,
  FETCH_VOTE_QUESTION_FAILURE,
  CAST_VOTE_REQUEST,
  CAST_VOTE_SUCCESS,
  CAST_VOTE_FAILURE,
} from "../actions/types";

const initialState = {
  isLoading: false,
  questionText: null,
  choices: null,
  error: null,
  voteCastLoading: false,
  voteCastError: null,
  voteCastSuccess: false,
};

const votes = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOTE_QUESTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VOTE_QUESTION_SUCCESS:
      return {
        isLoading: false,
        questionText: action.questionText,
        choices: action.choices,
        error: null,
      };
    case FETCH_VOTE_QUESTION_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    case CAST_VOTE_REQUEST:
      return {
        ...state,
        voteCastLoading: true,
        voteCastError: null,
        voteCastSuccess: false,
      };
    case CAST_VOTE_SUCCESS:
      return {
        ...state,
        voteCastLoading: false,
        voteCastError: null,
        voteCastSuccess: true,
      };
    case CAST_VOTE_FAILURE:
      return {
        ...state,
        voteCastLoading: false,
        voteCastError: action.error,
        voteCastSuccess: false,
      };
    default:
      return state;
  }
};

export default votes;
