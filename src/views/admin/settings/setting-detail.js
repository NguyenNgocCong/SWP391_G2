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
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
} from "../component";

function SettingDetail(props) {
    const [setting, setSetting] = useState();
    const [listType, setListType] = useState();
    const [status, setStatus] = useState(0);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();
    const [displayOrder, setDisplayOrder] = useState();
    const [typeId, setTypeId] = useState();
    const [validated, setValidated] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/settings/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getSettingById = async () => {
        try {
            const response = await adminApi.getSettingById(id);
            setSetting(response);
            setStatus(response.status);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getAllType = async () => {
        try {
            const response = await adminApi.getListType();
            setListType(response);
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
                const params = type === 1 ? {
                    setting_id: id,
                    type_id: typeId,
                    setting_title: title,
                    setting_value: value,
                    display_order: displayOrder,
                    desciption: description,
                    status: status,
                } : {
                    type_id: typeId,
                    setting_title: title,
                    setting_value: value,
                    display_order: displayOrder,
                    desciption: description,
                    status: status,
                };
                const response =
                    type === 1
                        ? await adminApi.updateSetting(params)
                        : await adminApi.createSetting(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/settings");
            }
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const optionStatus = [
        { status: false, label: "Deactivate" },
        { status: true, label: "Active" },
    ];

    useEffect(() => {
        if (type === 1) {
            getSettingById(id);
        }
        getAllType();
        // eslint-disable-next-line
    }, []);

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
                                <strong>Thông tin Setting</strong>
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
                                                <CFormLabel>
                                                    Tiêu đề (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={
                                                        type === 1 ? setting?.setting_title : ""
                                                    }
                                                    onChange={(e) =>
                                                        setTitle(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Title!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel>
                                                    Giá trị (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={
                                                        type === 1 ? setting?.setting_value : ""
                                                    }
                                                    onChange={(e) =>
                                                        setValue(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Value!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel>
                                                    Hiển thị (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={
                                                        type === 1 ? setting?.display_order : ""
                                                    }
                                                    onChange={(e) =>
                                                        setDisplayOrder(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Display Order!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel>
                                                    Mô tả (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={
                                                        type === 1 ? setting?.desciption : ""
                                                    }
                                                    onChange={(e) =>
                                                        setDescription(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Description!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Trạng thái (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    onChange={(e) =>
                                                        setStatus(e.target.value)
                                                    }
                                                    feedbackInvalid="Please choose Status!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Chọn trạng thái</option>
                                                    {optionStatus?.map((item, index) => {
                                                        if (type === 1) {
                                                            return setting?.status ===
                                                                item?.status ? (
                                                                <option
                                                                    key={index}
                                                                    value={item?.status}
                                                                    selected
                                                                >
                                                                    {item?.label}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={item?.status}
                                                                >
                                                                    {item?.label}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={item?.status}
                                                                >
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
                                                    Loại (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    onChange={(e) =>
                                                        setTypeId(e.target.value)
                                                    }
                                                    feedbackInvalid="Please choose Type!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Chọn loại</option>
                                                    {listType?.map((item, index) => {
                                                        if (type === 1) {
                                                            return setting?.type.type_id === item?.type_id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.type_id
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.title}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.type_id
                                                                    }
                                                                >
                                                                    {item?.title}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.type_id
                                                                    }
                                                                >
                                                                    {item?.title}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </CFormSelect>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <div className="mb-3">
                                        <CButton
                                            type="submit"
                                        >
                                            Lưu
                                        </CButton>
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

export default SettingDetail;
