import axios from "axios";

const liveApi = axios.create({
  baseURL: "https://streamed.pk/api",
});

export const getLiveMatches = () => {
  return liveApi.get("/matches/all");
};

export const getMatchStream=(source,id)=>{
    return liveApi.get(`/stream/${source}/${id}`);

};