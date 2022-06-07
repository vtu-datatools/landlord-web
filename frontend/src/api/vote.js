import axiosAPI from "./base";
import { VOTE_OPTIONS_URL } from "./constants";

export async function fetchVoteOptionsApi() {
  const response = await axiosAPI.get(VOTE_OPTIONS_URL);
  return response;
}
