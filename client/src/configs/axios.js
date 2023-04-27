import axios from "axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

import eventBus from "../utils/evenBus";
const instanceWithAccess = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

instanceWithAccess.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const expirationTime = JSON.parse(
    localStorage.getItem("accessTokenExpiration")
  );

  if (token && expirationTime && Date.now() < expirationTime) {
    config.headers["authorization"] = `${token}`;
  } else {
    try {
      const refreshToken = cookies.get("RefreshToken");
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/generateAccessToken",
        {
          refreshToken,
        }
      );
      if (response.status == 400 || response.status == 401) {
        eventBus.emit("showModalRefresh", true);
      }
      const { auth, expiresIn } = response.data;
      localStorage.setItem("accessToken", JSON.stringify(auth));
      localStorage.setItem(
        "accessTokenExpiration",
        JSON.stringify(Date.now() + expiresIn * 1000)
      );

      config.headers["authorization"] = `${auth}`;
    } catch (error) {
      eventBus.emit("showModalRefresh", true);
    }
  }

  return config;
});

export { instance, instanceWithAccess };
