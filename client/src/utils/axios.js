import axios from "axios";

const customFetch = axios.create({ baseURL: "http://localhost:5010/api/v1" });

const authorizedFetch = (token) => {
  return axios.create({
    headers: { Authorization: `Bearer ${token}` },
    baseURL: "http://localhost:5010/api/v1",
  });
};

export { customFetch, authorizedFetch };
