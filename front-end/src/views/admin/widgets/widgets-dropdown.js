import React from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsB,
  CCardHeader,
  CCard,
  CCardBody,
} from '@coreui/react'
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../../api/dashboardApi";
const WidgetsDropdown = () => {
  const [dataPost, setDataPost] = useState();
  const [dataClass, setDataClass] = useState();
  const [dataCombo, setDataCombo] = useState();
  const [dataPackage, setDataPackage] = useState();
  const [dataUser, setDataUser] = useState();
  const [dataTrainee, setDataTrainee] = useState();
  const getDataDashboard = async () => {
    try {
      const response = await dashboardApi.getClasss();
      setDataClass(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
    try {
      const response = await dashboardApi.getCombos();
      setDataCombo(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
    try {
      const response = await dashboardApi.getPackages();
      setDataPackage(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
    try {
      const response = await dashboardApi.getPosts();
      setDataPost(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
    try {
      const response = await dashboardApi.getTrainees();
      setDataTrainee(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
    try {
      const response = await dashboardApi.getUsers();
      setDataUser(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    getDataDashboard();
    // eslint-disable-next-line
  }, []);
  return (
    <CCard className="mb-1">
      <CCardBody>
        <CRow>
          <CCol xs={12} sm={6} lg={4}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'success', value: (dataUser?.total_new_user / dataUser?.total_old_user * 100) }}
              text={"Số người dùng mới tuần trước: " + (dataUser?.total_old_user ? dataUser?.total_old_user: 0)}
              title={"Số người dùng mới trong tuần: " + (dataUser?.total_new_user ? dataUser?.total_new_user: 0)}
              value={dataUser?.total_new_user ? (dataUser?.total_new_user / dataUser?.total_old_user * 100).toFixed(0) + "%" : "0%"}
            />
          </CCol>
          <CCol xs={12} sm={6} lg={4}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'warning', value: (dataPost?.total_new_post / dataPost?.total_old_post * 100) }}
              text={"Số bài viết mới tuần trước: " + (dataPost?.total_old_post ? dataPost?.total_old_post: 0)}
              title={"Số bài viết mới trong tuần: " + (dataPost?.total_new_post ? dataPost?.total_new_post : 0)}
              value={dataPost?.total_new_post ? (dataPost?.total_new_post / dataPost?.total_old_post * 100).toFixed(0) + "%" : "0%"}
            />
          </CCol>
          <CCol xs={12} sm={6} lg={4}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'primary', value: (dataTrainee?.total_trainee_onl / dataTrainee?.total_trainee_off * 100) }}
              text={"Số học viên offline: " + (dataTrainee?.total_trainee_off ? dataTrainee?.total_trainee_off: 0)}
              title={"Số học viên online: " + (dataTrainee?.total_trainee_onl ? dataTrainee?.total_trainee_onl: 0)}
              value={dataTrainee?.total_trainee_onl ? (dataTrainee?.total_trainee_onl / dataTrainee?.total_trainee_off * 100).toFixed(0) + "%" : "0%"}
            />
          </CCol>
          <CCol xs={12} sm={6} lg={4}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'info', value: (dataClass?.total_new_class / dataClass?.total_old_class * 100) }}
              text={"Lớp học bán tuần trước: " + (dataClass?.total_old_class ? dataClass?.total_old_class: 0)}
              title={"Lớp học bán tuần này: " + (dataClass?.total_new_class ? dataClass?.total_new_class: 0)}
              value={dataClass?.total_new_class ? (dataClass?.total_new_class / dataClass?.total_old_class * 100).toFixed(0) + "%" : "0%"}
            />
          </CCol>
          <CCol xs={12} sm={6} lg={4}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'error', value: (dataPackage?.total_new_package / dataPackage?.total_old_package * 100) }}
              text={"Khóa học bán tuần trước: " + (dataPackage?.total_old_package ? dataPackage?.total_old_package: 0)}
              title={"Khóa học bán tuần này: " + (dataPackage?.total_new_package ? dataPackage?.total_new_package: 0)}
              value={dataPackage?.total_new_package ? (dataPackage?.total_new_package / dataPackage?.total_old_package * 100).toFixed(0) + "%" : "0%"}
            />
          </CCol>
          <CCol xs={12} sm={6} lg={4}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'success', value: (dataCombo?.total_new_combo / dataCombo?.total_old_combo * 100) }}
              text={"Combo bán tuần trước: " + (dataCombo?.total_old_combo ? dataCombo?.total_old_combo: 0)}
              title={"Combo bán tuần này: " + (dataCombo?.total_new_combo ? dataCombo?.total_new_combo: 0)}
              value={dataCombo?.total_new_combo ? (dataCombo?.total_new_combo / dataCombo?.total_old_combo * 100).toFixed(0) + "%" : "0%"}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default WidgetsDropdown
