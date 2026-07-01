import axios from "axios";

const liveApi = axios.create({
  baseURL: "https://streamed.pk/api",
});

export const getLiveMatches = () => {
  return liveApi.get("/matches/live/popular");
};