import axiosApi from "./axiosApi";

export const expert = {
  getAllExpert: (page) => {
    return axiosApi.get(`/api/expert/views?page=${page}`);
  },
  getExpertById: (id) => {
    return axiosApi.get(`/api/expert/${id}`);
  },
};
