import {
  FETCH_VOTE_OPTIONS_REQUEST,
  FETCH_VOTE_OPTIONS_SUCCESS,
  FETCH_VOTE_OPTIONS_FAILURE,
} from "./types";
import { fetchVoteOptionsApi } from "../../api";

export const fetchOptions = () => (dispatch) => {
  dispatch(fetchVoteOptionsRequest());

  fetchVoteOptionsApi()
    .then((response) => {
      console.log("here");
      console.log(response.data);
      dispatch(fetchVoteOptionsSucess(response.data));
    })
    .catch((error) => {
      console.log("Error obtaining token. " + error);
    });
};

export const fetchVoteOptionsRequest = () => {
  return {
    type: FETCH_VOTE_OPTIONS_REQUEST,
  };
};

export const fetchVoteOptionsSucess = (data) => {
  return {
    type: FETCH_VOTE_OPTIONS_SUCCESS,
    voteOptions: data,
  };
};

export const fetchVoteOptionsFailure = (error) => {
  return {
    type: FETCH_VOTE_OPTIONS_FAILURE,
    error,
  };
};
