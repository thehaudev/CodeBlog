import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",

});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  if (token) {
    config.headers["authorization"] = `${token}`;
  }
  return config;
});

export default instance