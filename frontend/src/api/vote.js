import axiosAPI from "./base";
import { VOTE_URL, CAST_VOTE_URL } from "./constants";

export async function fetchVoteQuestionApi(question) {
  const response = await axiosAPI.get(VOTE_URL + question);
  return response;
}

export const castVoteApi = (choice_id) => {
  return axiosAPI.post(CAST_VOTE_URL, choice_id);
};
