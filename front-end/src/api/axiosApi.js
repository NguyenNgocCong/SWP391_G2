import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosApi.interceptors.request.use(async (config) => {
  let token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosApi.interceptors.response.use(
  // async (response) => {
  //     if (response && response.data) {
  //         if (
  //             response.data.error_code
  //         ) {
  //             let refresh_token = Cookies.get("refreshToken");

  //             const params = {
  //                 refresh: refresh_token,
  //             };
  //             return await axiosApi
  //                 .post("/iuhcoder/api/token/refresh/", params)
  //                 .then((response) => {
  //                     if (response.data.error_message === "success") {
  //                         Cookies.set("access_token");
  //                         axios.defaults.headers.common[
  //                             "Authorization"
  //                         ] = `Bearer ${Cookies.get("access_token")}`;
  //                     } else {
  //                         Cookies.remove("id");
  //                         Cookies.remove("accessToken");
  //                         Cookies.remove("refreshToken");
  //                     }
  //                 });
  //         }
  //     }
  //     return response;
  // },
  // (error) => {
  //     throw error;
  // }
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error?.response;
  }
);

export default axiosApi;
