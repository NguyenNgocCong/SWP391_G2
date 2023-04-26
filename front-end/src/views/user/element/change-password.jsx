import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { userApi } from "../../../api/userApi";
import { CForm, CFormInput } from "@coreui/react";

function ChangePassword(props) {
    const [password, setPassword] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setPopupAlertType] = useState("primary");
    const [validated, setValidated] = useState(false);

    const handleChangeProfile = async (event) => {
        const form = event.currentTarget
        setValidated(true)
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
            if ((password !== "") && (password !== rePassword)) {
                setAlertMessage("re input password wrong");
                setAlertVisible(true);
                setPopupAlertType("danger");
                return;
            }
            try {
                const param = {
                    password: password,
                    oldPassword: oldPassword,
                };
                const id = Cookies.get("id");
                const response = await userApi.updateInfo(param, id);
                setAlertMessage(response?.message);
                setAlertVisible(true);
                setPopupAlertType("success");
                toast.success(response?.message, {
                    duration: 2000,
                });
            } catch (responseError) {
                setAlertMessage(responseError?.data.errorCode === 1101 ? responseError?.message : "Sai mật khẩu cũ");
                setAlertVisible(true);
                setPopupAlertType("danger");
            }
        }
    };

    return (
        <>
            <div className="profile-head">
                <h5>Thay đổi mật khẩu</h5>
            </div>
            <CForm className="edit-profile"
                onSubmit={handleChangeProfile}
                noValidate
                validated={validated}
            >
                <div className="">
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                            <h3>Mật khẩu</h3>
                        </div>
                    </div>
                    <Toaster position="top-right" reverseOrder={true} />
                    <div
                        className={`alert alert-${alertType} fade show`}
                        role="alert"
                        style={{ display: `${alertVisible ? "" : "none"}` }}
                    >
                        {alertMessage}
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Mật khẩu cũ:
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <CFormInput
                                className="form-control"
                                required
                                type="password"
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Mật khẩu mới:
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <CFormInput
                                className="form-control"
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Nhập lại mật khẩu:
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <CFormInput
                                className="form-control"
                                type="password"
                                required
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-3"></div>
                    <div className="col-12 col-sm-8 col-md-8 col-lg-7 d-flex align-items-center">
                        <button
                            className="btn btn-ms m-r10 btn-warning mt-2"
                            type="submit"
                        >
                            Lưu thay đổi
                        </button>
                        <button
                            className="btn btn-ms btn-secondary mt-2"
                            type="reset"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </CForm>
        </>
    );
}

export default ChangePassword;
