import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";

function UserDetail(props) {
  const [listRole, setListRole] = useState([]);
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState();
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [note, setNote] = useState();
  const location = useLocation();
  const history = useHistory();
  const [option, setOption] = useState();
  const [alertMessageUsername, setAlertMessageUsername] = useState();
  const [alertVisibleUsername, setAlertVisibleUsername] = useState(false);
  const [alertMessageFullName, setAlertMessageFullName] = useState();
  const [alertVisibleFullName, setAlertVisibleFullName] = useState(false);
  const [alertMessagePhone, setAlertMessagePhone] = useState();
  const [alertVisiblePhone, setAlertVisiblePhone] = useState(false);
  const id = location.pathname.substring(
    "/admin/users/".length,
    location.pathname.length
  );


  const getListRole = async () => {
    try {
      const response = await adminApi.getListRole();
      setListRole(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const getUserById = async () => {
    try {
      const response = await adminApi.getUserById(id);
      setUser(response);
      setPhone(response.phoneNumber);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const handleUpdateRoleAndProfile = async () => {
    try {
      const params = {
        username: user?.username,
        role: option,
      };
      const paramsProfile = {
        username: username,
        fullname: fullname,
        phoneNumber: phone,
        note: note,
      };
      if (!alertVisibleFullName && !alertVisibleUsername && !alertVisiblePhone) {
        if (option !== user.role && option !== undefined) {
          await adminApi.updateRoleUser(params);
        }
        const responseProfile = await adminApi.updateUserProfile(
          paramsProfile,
          user?.id
        );
        toast.success(responseProfile?.message, {
          duration: 2000,
        });
        history.push("/admin/users");
      }
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
      console.log(responseError);
    }
  };
  useEffect(() => {
    getListRole();
    if (id !== undefined) {
      getUserById();
    }
    // eslint-disable-next-line
  }, []);


  const handleUpdateUsername = (e) => {
    const regUsername = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const usernameInput = e.target.value;
    if (!regUsername.test(usernameInput)) {
      setAlertMessageUsername("Định dạng username không đúng");
      setAlertVisibleUsername(true);
    } else if (!usernameInput) {
      setAlertMessageUsername("Không được để trống");
      setAlertVisibleUsername(true);
    }
    else {
      setAlertVisibleUsername(false);
    }
    setUsername(usernameInput);
  };
  const handleUpdatePhone = (e) => {
    const regPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const phoneInput = e.target.value;
    if (!regPhoneNumber.test(phoneInput)) {
      setAlertMessagePhone("Định dạng số điện thoại không đúng");
      setAlertVisiblePhone(true);
    } else {
      setAlertVisiblePhone(false);
    }
    setPhone(phoneInput);
  };

  const handleUpdateFullName = (e) => {
    const fullNameInput = e.target.value;
    if (!fullNameInput) {
      setAlertMessageFullName("Không được để trống");
      setAlertVisibleFullName(true);
    } else {
      setAlertVisibleFullName(false);
    }
    // eslint-disable-next-line

    setFullname(fullNameInput);
  }


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
                <strong>Thông tin người dùng</strong>
              </CCardHeader>
              <CCardBody>

                <CRow className="g-3 mb-3">
                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormInput
                        disabled
                        label="Email"
                        type="email"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                        defaultValue={user?.email}
                      />
                    </div>
                  </CCol>
                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormInput
                        type="text"
                        label="Tên tài khoản"
                        id="exampleFormControlInput1"
                        placeholder=""
                        defaultValue={user?.username}
                        onChange={(e) => handleUpdateUsername(e)}
                      />
                    </div>
                    <div className="mt-3"
                      style={{
                        display: `${alertVisibleUsername ? "" : "none"}`, color: 'red'
                      }}
                    >
                      {alertMessageUsername}
                    </div>
                  </CCol>
                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormInput
                        type="text"
                        label="Họ và tên"
                        id="exampleFormControlInput1"
                        placeholder=""
                        defaultValue={user?.fullname}
                        onChange={(e) => handleUpdateFullName(e)}

                      />
                    </div>
                    <div
                      className="mt-3"
                      style={{
                        display: `${alertVisibleFullName ? "" : "none"}`, color: 'red'
                      }}
                    >
                      {alertMessageFullName}
                    </div>
                  </CCol>
                  <CCol sm={3}>
                    <div className="mb-3">
                      <CFormInput
                        label="Số điện thoại"
                        id="exampleFormControlInput1"
                        placeholder=""
                        defaultValue={user?.phoneNumber}
                        onChange={(e) => handleUpdatePhone(e)}
                        type="number"
                      />
                    </div>
                    <div className="mt-3"
                      style={{
                        display: `${alertVisiblePhone ? "" : "none"}`, color: 'red'
                      }}
                    >
                      {alertMessagePhone}
                    </div>
                  </CCol>
                  <CCol sm={3}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="formFile">
                        Role
                      </CFormLabel>
                      <CFormSelect
                        aria-label="Default select example"
                        onChange={(e) => setOption(e.target.value)}
                        defaultValue={user?.role}
                      >
                        {listRole?.map((item, index) => {
                          return user?.role === item?.setting_value ? (
                            <option
                              key={index}
                              value={item?.setting_value}
                              selected
                            >
                              {item?.setting_value?.replace("ROLE_", "")}
                            </option>
                          ) : (
                            <option key={index} value={item?.setting_value}>
                              {item?.setting_value?.replace("ROLE_", "")}
                            </option>
                          );
                        })}
                      </CFormSelect>
                    </div>
                  </CCol>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Note (<span style={{ color: "red" }}>*</span>)
                    </CFormLabel>
                    <CFormTextarea
                      type="text"
                      id="exampleFormControlInput1"
                      rows="3"
                      defaultValue={user?.note}
                      placeholder=""
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </CRow>
                <div className="mb-3">
                  <CButton onClick={() => handleUpdateRoleAndProfile()} disabled={alertVisibleFullName || alertVisiblePhone || alertVisibleUsername}>
                    Lưu
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <AppFooter />
      </div>
    </div >
  );
}

export default UserDetail;