import {
  FETCH_VOTE_QUESTION_REQUEST,
  FETCH_VOTE_QUESTION_SUCCESS,
  FETCH_VOTE_QUESTION_FAILURE,
  CAST_VOTE_REQUEST,
  CAST_VOTE_SUCCESS,
  CAST_VOTE_FAILURE,
} from "./types";
import { fetchVoteQuestionApi, castVoteApi } from "../../api";
import { apiErrorHandler } from "../../utils/errorhandler";

export const fetchQuestion = (question) => (dispatch) => {
  dispatch(fetchVoteQuestionRequest());

  fetchVoteQuestionApi(question)
    .then((response) => {
      dispatch(fetchVoteQuestionSucess(response.data));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchVoteQuestionFailure(errorMessage));
      alert("You are only allowed to vote once");
    });
};

export const fetchVoteQuestionRequest = () => {
  return {
    type: FETCH_VOTE_QUESTION_REQUEST,
  };
};

export const fetchVoteQuestionSucess = (data) => {
  return {
    type: FETCH_VOTE_QUESTION_SUCCESS,
    questionText: data.question_text,
    choices: data.choices,
  };
};

export const fetchVoteQuestionFailure = (error) => {
  return {
    type: FETCH_VOTE_QUESTION_FAILURE,
    error,
  };
};

export const castVote = (choice_id) => (dispatch) => {
  dispatch(castVoteRequest());

  castVoteApi(choice_id)
    .then(() => {
      dispatch(castVoteSuccess());
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(castVoteFailure(errorMessage));
    });
};

export const castVoteRequest = (choice_id) => {
  return {
    type: CAST_VOTE_REQUEST,
    choice_id,
  };
};

export const castVoteSuccess = (choice_id) => {
  return {
    type: CAST_VOTE_SUCCESS,
    choice_id,
  };
};

export const castVoteFailure = (error) => {
  return {
    type: CAST_VOTE_FAILURE,
    error,
  };
};
