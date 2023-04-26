import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../component";

function TraineeDetail(props) {
  const [detailClass, setDetailClass] = useState();
  const [classId, setClassId] = useState();
  const [listPackages, setListPackages] = useState([]);
  const [userId, setUserId] = useState();
  const [dropOutDate, setDropOutDate] = useState();
  const [status, setStatus] = useState();
  const [validated, setValidated] = useState(false);
  const role = JSON.parse(Cookies.get("user"))?.role;
  const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.substring(
    "/admin/trainee-onl/".length,
    location.pathname.length,
  );
  const type = id !== "create" ? 1 : 0;

  const getTraineeDetailById = async () => {
    try {
      const response = await adminApi.getTraineeDetailById(id);
      setDetailClass(response);
      setUserId(response?.user?.id);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const getListPackage = async () => {
    try {
      const response = await adminApi.getAllPackageView(0, 50, "", 0, "");
      setListPackages(response.data);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget
      setValidated(true)
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity()) {
        const params = {
          class: classId,
          status: status,
          dropOutDate: dropOutDate,
          userId: userId,
        };
        const response =
          type === 1
            ? await adminApi.updateTrainee(params, id)
            : await adminApi.createClass(params);
        toast.success(response?.message, {
          duration: 2000,
        });
        history.push("/admin/trainee");
      }
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (type === 1) {
      getTraineeDetailById();
    }
    getListPackage();
    // eslint-disable-next-line
  }, []);

  const optionStatus = [
    { status: false, label: "Không hoạt động" },
    { status: true, label: "Hoạt động" },
  ];

  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>
                  {type === 1 ? "Thông tin học viên" : "Tạo học viên mới"}
                </strong>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CRow className="g-3 mb-3">
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Lớp học (<span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormSelect
                          id="autoSizingSelect"
                          onChange={(e) => setClassId(e.target.value)}
                        >
                           {listPackages?.map((item, index) => {
                            if (type === 1) {
                              return detailClass?.status ? (
                                <option key={index} value={item?.id} selected>
                                  {item?.title}
                                </option>
                              ) : (
                                <option key={index} value={item?.id}>
                                  {item?.title}
                                </option>
                              );
                            } else {
                              return (
                                <option key={index} value={item?.id}>
                                  {item?.title}
                                </option>
                              );
                            }
                          })}
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Email (<span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormInput
                          disabled
                          type="email"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          defaultValue={detailClass?.user?.email}
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Trạng thái (<span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormSelect
                          aria-label="Default select example"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {optionStatus?.map((item, index) => {
                            if (type === 1) {
                              return detailClass?.status ? (
                                <option key={index} value={item?.status} selected>
                                  {item?.label}
                                </option>
                              ) : (
                                <option key={index} value={item?.status}>
                                  {item?.label}
                                </option>
                              );
                            } else {
                              return (
                                <option key={index} value={item?.status}>
                                  {item?.label}
                                </option>
                              );
                            }
                          })}
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="formFile">
                          Họ và tên(
                          <span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormInput
                          disabled
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder=""
                          defaultValue={detailClass?.user?.fullname}
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ngày bắt đầu(
                          <span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormInput
                          type="date"
                          id="exampleFormControlInput1"
                          disabled={isNotAdmin}
                          placeholder=""
                          value={
                            dropOutDate
                              ? new Date(dropOutDate).toLocaleDateString("en-CA")
                              : new Date("").toLocaleDateString("en-CA")
                          }
                          onChange={(e) =>
                            setDropOutDate(new Date(e.target.value))
                          }
                          feedbackInvalid="Không được để trống!"
                          required
                          tooltipFeedback
                        />
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Số điện thoại (<span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormInput
                          disabled
                          type="number"
                          id="exampleFormControlInput1"
                          placeholder=""
                          defaultValue={detailClass?.user?.phoneNumber}
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <div className="mb-3">
                    <CButton type="submit">Lưu</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default TraineeDetail;
