import axiosApi from "./axiosApi";

export const classApi = {
  getAllClass: (page) => {
    return axiosApi.get(`/api/class/views/?page=${page}&size=9`);
  },
  getClassById: (id) => {
    return axiosApi.get(`/api/class/views/${id}`);
  },
};
