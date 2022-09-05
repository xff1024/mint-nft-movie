import { API_KEY, API_HOST } from "./constant";
// 获取电影列表
export const getMoveLists = () => {
  return fetch(`${API_HOST}/now_playing?api_key=${API_KEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  }).then((res) => res.json());
};

// 获取电影详情
export const getMoiveDetailById = (params = {}) => {
  return fetch(`${API_HOST}/${params.id}?api_key=${API_KEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  }).then((res) => res.json());
};
