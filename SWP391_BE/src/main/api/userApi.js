import axiosApi from "./axiosApi";

export const userApi = {
  forgetPassword: (params) => {
    const url = "/api/account/forgot-password";
    return axiosApi.post(url, params);
  },
  resetPassword: (token, params) => {
    const url = "/api/account/reset-password?token=" + token;
    return axiosApi.post(url, params);
  }
};
