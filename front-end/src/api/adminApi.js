import axiosApi from "./axiosApi";

export const adminApi = {
  getListRole: () => {
    const url = "/api/role/roles";
    return axiosApi.get(url);
  },
  getListUser: (page, size, keyword, status, role) => {
    const url = `/api/admin/users?page=${page}&size=${size}&keyword=${keyword}&status=${status}&role=${role}`;
    return axiosApi.get(url);
  },
  updateActiveUser: (params) => {
    const url = "/api/admin/users/active";
    return axiosApi.post(url, params);
  },
  updateRoleUser: (params) => {
    const url = "/api/role/update";
    return axiosApi.post(url, params);
  },
  getUserById: (id) => {
    const url = `/api/admin/users/${id}`;
    return axiosApi.get(url);
  },
  updateUserProfile: (params, id) => {
    const url = `/api/admin/users/update-user?id=${id}`;
    return axiosApi.post(url, params);
  },

  getListManager: () => {
    const url = "/api/admin/users/manager-list";
    return axiosApi.get(url);
  },
  getListUserExpert: () => {
    const url = "/api/admin/users/expert-list";
    return axiosApi.get(url);
  },
  getListTrainer: () => {
    const url = `/api/admin/users/trainer-list`;
    return axiosApi.get(url);
  },
  getListSupporter: () => {
    const url = `/api/admin/users/supporter-list`;
    return axiosApi.get(url);
  },

  // Web Contact
  getAllContact: (page, size, keyword, category, status) => {
    const url = `/api/admin/web-contact?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getContactById: (id) => {
    const url = `/api/admin/web-contact/${id}`;
    return axiosApi.get(url);
  },
  updateStatusContact: (params, id) => {
    const url = `/api/admin/web-contact/update-status?id=${id}`;
    return axiosApi.put(url, params);
  },
  deleteContact: (id) => {
    const url = `/api/admin/web-contact/delete?id=${id}`;
    return axiosApi.delete(url);
  },
  updateContact: (params, id) => {
    const url = `/api/admin/web-contact/update?id=${id}`;
    return axiosApi.put(url, params);
  },
  // expert
  getListExperts: (page, size, keyword) => {
    const url = `/api/expert?page=${page}&size=${size}&keyword=${keyword}`;
    return axiosApi.get(url);
  },
  getExpertById: (id) => {
    const url = `/api/expert/${id}`;
    return axiosApi.get(url);
  },
  updateExpert: (id, params, image) => {
    const url = `/api/expert/update`;
    var formData = new FormData();
    formData.append("id", id);
    formData.append("data", JSON.stringify(params));
    formData.append("image", image);
    return axiosApi.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  //order
  getAllRegistration: (page, size, keyword, category, status) => {
    const url = `/api/order/list-off?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getAllOrder: (page, size, keyword, category, status) => {
    const url = `/api/order/list-onli?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getAllOrderDone: (page, size, keyword) => {
    const url = `/api/order/list-confirm?page=${page}&size=${size}&keyword=${keyword}`;
    return axiosApi.get(url);
  },
  getAllOrderCancel: (page, size, keyword) => {
    const url = `/api/order/list-cancel?page=${page}&size=${size}&keyword=${keyword}`;
    return axiosApi.get(url);
  },
  getOrderDetail: (id) => {
    const url = `/api/order/${id}`;
    return axiosApi.get(url);
  },
  updateOrder: (status, id) => {
    const url = `/api/order/update-status?id=${id}&status=${status}`;
    return axiosApi.put(url);
  },
  createOrderAdmin: (params) => {
    const url = `api/order/createAdmin`;
    return axiosApi.post(url, params);
  },
  updateOrderAdmin: (params, id) => {
    const url = `api/order/updateOrderAdmin?id=${id}`;
    return axiosApi.put(url, params);
  },
  removeOrder: (params) => {
    const url = `/api/order/remove-order`;
    return axiosApi.delete(url, { params });
  },
  removeProductFromOrder: (params) => {
    const url = `/api/order/remove-product-from-order`;
    return axiosApi.delete(url, { params });
  },
  // subject
  getAllSubject: (page, size, keyword, category, status) => {
    const url = `/api/subjects?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getSubjectDetail: (id) => {
    const url = `/api/subjects/${id}`;
    return axiosApi.get(url);
  },
  addSubject: (params) => {
    const url = `/api/subjects/create`;
    return axiosApi.post(url, params);
  },
  updateSubject: (params, id) => {
    const url = `/api/subjects/update?id=${id}`;
    return axiosApi.put(url, params);
  },
  managerUpdateSubject: (params) => {
    const url = "/api/subjects/manager-update";
    return axiosApi.put(url, params);
  },

  // class
  getAllClass: (page, size, keyword, category, status) => {
    const url = `/api/class?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getClassDetail: (id) => {
    const url = `/api/class/${id}`;
    return axiosApi.get(url);
  },
  createClass: (params) => {
    const url = "/api/class/create";
    return axiosApi.post(url, params);
  },
  updateClass: (params, id) => {
    const url = `/api/class/update?id=${id}`;
    return axiosApi.post(url, params);
  },

  //post
  getAllPost: (page, size, keyword, category, status) => {
    const url = `/api/post?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getPostById: (id) => {
    const url = `/api/post/${id}`;
    return axiosApi.get(url);
  },
  createPost: (params, image) => {
    const url = `/api/post/create`;
    var formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updatePost: (id, params, image) => {
    const url = `/api/post/update`;
    var formData = new FormData();
    formData.append("id", id);
    formData.append("data", JSON.stringify(params));
    formData.append("image", image);
    return axiosApi.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deletePost: (id) => {
    const url = `/api/post/delete?id=${id}`;
    return axiosApi.delete(url);
  },

  //slide
  getAllSlider: (page, size, status) => {
    const url = `/api/slide/manage?page=${page}&size=${size}&status=${status}`;
    return axiosApi.get(url);
  },
  getSliderById: (id) => {
    const url = `/api/slide/${id}`;
    return axiosApi.get(url);
  },
  createSlider: (image, params) => {
    const url = `/api/slide/create`;
    var formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateSlider: (id, image, params) => {
    const url = `/api/slide/update`;
    var formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteSlider: (id) => {
    const url = `/api/slide/delete?id=${id}`;
    return axiosApi.delete(url);
  },
  //product
  getAllProduct: (page, size, keyword, category, status) => {
    const url = `/api/package?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getListPackage: (
    page = 0,
    size = 50,
    keyword = "",
    category = 0,
    status = ""
  ) => {
    const url = `/api/package?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getAllPackageView: (params) => {
    const url = `/api/package/views`;
    return axiosApi.get(url, { params: params || {} });
  },
  getProductById: (id) => {
    const url = `/api/package/views/${id}`;
    return axiosApi.get(url);
  },
  getPackageById: (id) => {
    const url = `/api/package/${id}`;
    return axiosApi.get(url);
  },
  createPackage: (image, params) => {
    const url = `/api/package/create`;
    var formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updatePackage: (id, image, params) => {
    const url = `/api/package/update`;
    var formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  //combo
  getAllCombo: (page, size, keyword) => {
    const url = `/api/combo?page=${page}&size=${size}&keyword=${keyword}`;
    return axiosApi.get(url);
  },
  getComboById: (id) => {
    const url = `/api/combo/${id}`;
    return axiosApi.get(url);
  },
  createCombo: (image, params) => {
    const url = `/api/combo/create`;
    var formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateCombo: (id, image, params) => {
    const url = `/api/combo/update`;
    var formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getAllSetting: (page, size, type_id, keyword, status) => {
    const url = `/api/admin/setting/getListSetting?page=${page}&size=${size}&category=${type_id}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getSettingById: (id) => {
    const url = `/api/admin/setting/getSetting/${id}`;
    return axiosApi.get(url);
  },
  createSetting: (params) => {
    const url = "/api/admin/setting/addSetting";
    return axiosApi.post(url, params);
  },
  updateSetting: (params) => {
    const url = `/api/admin/setting/updateSetting`;
    return axiosApi.put(url, params);
  },
  getListType: () => {
    const url = `/api/admin/setting/getListType`;
    return axiosApi.get(url);
  },

  //List Category
  getListCategoryPost: () => {
    const url = `/api/admin/setting/list-category-post`;
    return axiosApi.get(url);
  },
  getListCategoryBranch: () => {
    const url = `/api/admin/setting/list-category-branch`;
    return axiosApi.get(url);
  },
  getListCategorySubject: () => {
    const url = `/api/admin/setting/list-category-subject`;
    return axiosApi.get(url);
  },
  getListCategoryWebContact: () => {
    const url = `/api/admin/setting/list-category-WebContact`;
    return axiosApi.get(url);
  },

  //coupon 
  getAllCoupon: (page, size) => {
    const url = `/api/coupon?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  deleteCoupon: (id) => {
    const url = `/api/coupon/delete?id=${id}`;
    return axiosApi.delete(url);
  },
  getCouponDetail: (id) => {
    const url = `/api/coupon/getById/${id}`;
    return axiosApi.get(url);
  },
  updateCoupon: (params, id) => {
    const url = `api/coupon/update?id=${id}`;
    return axiosApi.put(url, params);
  },
  createCoupon: (params) => {
    const url = `api/coupon/create`;
    return axiosApi.post(url, params);
  },
  checkCoupon: (code) => {
    const url = `/api/coupon/${code}`;
    return axiosApi.get(url);
  },
  getAllCoupon: (page, size) => {
    const url = `/api/coupon?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  deleteCoupon: (id) => {
    const url = `/api/coupon/delete?id=${id}`;
    return axiosApi.delete(url);
  },
  //feedback
  getFeedbackDetail: (id) => {
    const url = `/api/feedback/getById/${id}`;
    return axiosApi.get(url);
  },
  updateFeedback: (params, id) => {
    const url = `api/feedback/update?id=${id}`;
    return axiosApi.put(url, params);
  },
  createFeedback: (params) => {
    const url = `api/feedback/create-admin`;
    return axiosApi.post(url, params);
  },
  getAllFeedback: (page, size) => {
    const url = `/api/feedback/list-website?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  deleteFeedback: (id) => {
    const url = `/api/feedback/delete?id=${id}`;
    return axiosApi.delete(url);
  },
  //trainee
  createTrainee: (params) => {
    const url = `api/trainee/create`;
    return axiosApi.post(url, params);
  },
  getAllTrainee: (page, size, keyword, category, status) => {
    const url = `/api/trainee?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getAllTraineeOnl: (page, size, keyword, category, status) => {
    const url = `/api/trainee/list-trainee-online?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getTraineeDetailById: (id) => {
    const url = `/api/trainee/${id}`;
    return axiosApi.get(url);
  },
  updateTrainee: (params, id) => {
    const url = `api/trainee/update?id=${id}`;
    return axiosApi.put(url, params);
  },
};
