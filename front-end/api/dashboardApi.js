import axiosApi from "./axiosApi";

export const dashboardApi = {

    getClasss: () => {
        const url = "/api/dashboard/class";
        return axiosApi.get(url);
    },
    getUsers: () => {
        const url = "/api/dashboard/users";
        return axiosApi.get(url);
    },
    getCombos: () => {
        const url = "/api/dashboard/combo";
        return axiosApi.get(url);
    },
    getPackages: () => {
        const url = "/api/dashboard/package";
        return axiosApi.get(url);
    },
    getTrainees: () => {
        const url = "/api/dashboard/trainee";
        return axiosApi.get(url);
    },
    getPosts: () => {
        const url = "/api/dashboard/post";
        return axiosApi.get(url);
    },
    getOrders: () => {
        const url = "/api/dashboard/order";
        return axiosApi.get(url);
    },
    getDataDoughnut: () => {
        const url = "/api/dashboard/doughnut";
        return axiosApi.get(url);
    },
    getDataBar: (category) => {
        const url = `/api/dashboard/chart-bar?category=${category}`;
        return axiosApi.get(url);
    }

};
