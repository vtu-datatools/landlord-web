import axios from "axios";

import { LANDLORDS_ISSUES_URL } from "./constants";

const controller = new AbortController();

export async function getLandlordIssues(map) {
  const mapBounds = map.getBounds().toBBoxString();
  const response = await axios.get("/api/" + LANDLORDS_ISSUES_URL, {
    params: {
      in_bbox: mapBounds,
    },
    signal: controller.signal,
  });
  return await response;
}
