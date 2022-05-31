import axios from "axios";

import { LANDLORDS_ISSUES_URL } from "./constants";

export async function getLandlordIssues(map) {
  const mapBounds = map.getBounds().toBBoxString();
  const response = await axios.get("/api/" + LANDLORDS_ISSUES_URL, {
    params: {
      in_bbox: mapBounds,
    },
  });
  return await response;
}
