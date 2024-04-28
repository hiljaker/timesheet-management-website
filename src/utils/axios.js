import axiosInstance from "axios";
import { env } from "./env";

const axios = axiosInstance.create({
  baseURL: env.baseUrl,
});

axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access-token") || "";

      config.headers.Authorization = "Bearer ".concat(accessToken);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axios;
