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
    CFormTextarea,
    CRow,
} from "@coreui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";

function SubjectDetail(props) {
    const [listCategory, setListCategory] = useState([]);
    const [listManager, setListManager] = useState();
    const [listExpert, setListExpert] = useState();
    const [subject, setSubject] = useState();
    const [categoryId, setCategoryId] = useState();
    const [codeSubject, setCodeSubject] = useState();
    const [name, setName] = useState();
    const [status, setStatus] = useState(false);
    const [note, setNote] = useState();
    const [manager, setManager] = useState();
    const [expert, setExpert] = useState();
    const [validated, setValidated] = useState(false);
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/subjects/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getListCategory = async () => {
        try {
            const response = await adminApi.getListCategorySubject();
            setListCategory(response);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getSubjectById = async () => {
        try {
            const response = await adminApi.getSubjectDetail(id);
            setSubject(response);
            setStatus(response.status);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getListManager = async () => {
        try {
            const response = await adminApi.getListManager();
            setListManager(response.data);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getListExpert = async () => {
        try {
            const response = await adminApi.getListUserExpert();
            setListExpert(response.data);
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
                    code: codeSubject,
                    name: name,
                    categoryId: categoryId,
                    status: status,
                    note: note,
                    manager: isNotAdmin ? JSON.parse(Cookies.get("user"))?.username : manager,
                    expert: expert
                };

                const response =
                    type === 1
                        ? await adminApi.updateSubject(params, id)
                        : await adminApi.addSubject(params);
                toast.success(response?.message, {
                    duration: 2000,
                });

                history.push("/admin/subjects");
            }
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getSubjectById();
        }
        if (role === "ROLE_ADMIN")
            getListManager();
        getListExpert();
        getListCategory();
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
                                    {type === 1
                                        ? "Thông tin môn học"
                                        : "Tạo môn học mới"}
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
                                                <CFormLabel>
                                                    Code (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={
                                                        type === 1 ? subject?.code : ""
                                                    }
                                                    onChange={(e) =>
                                                        setCodeSubject(e.target.value)
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Tên môn học (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    placeholder=""
                                                    defaultValue={
                                                        type === 1 ? subject?.name : ""
                                                    }
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Category (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    id="autoSizingSelect"
                                                    onChange={(e) => setCategoryId(e.target.value)}
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Select category</option>
                                                    {listCategory?.map((item, index) => {
                                                        if (type === 1) {
                                                            return subject?.category?.setting_id === item?.setting_id ? (
                                                                <option
                                                                    key={index}
                                                                    value={item?.setting_id}
                                                                    selected
                                                                >
                                                                    {item?.setting_title}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={item?.setting_id}
                                                                >
                                                                    {item?.setting_title}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={item?.setting_id}
                                                                >
                                                                    {item?.setting_title}
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
                                                    Status (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    onChange={(e) =>
                                                        setStatus(e.target.value)
                                                    }

                                                >
                                                    {optionStatus?.map((item, index) => {
                                                        if (type === 1) {
                                                            return subject?.status ===
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
                                                    Manager
                                                </CFormLabel>
                                                {isNotAdmin ? <CFormInput
                                                    readOnly
                                                    defaultValue={type === 1 ? subject?.manager?.username :JSON.parse(Cookies.get("user"))?.username }
                                                /> : <CFormSelect
                                                    aria-label="Default select example"
                                                    disabled={isNotAdmin}
                                                    onChange={(e) =>
                                                        setManager(e.target.value)
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option>Select manager</option>
                                                    {listManager?.map((item, index) => {
                                                        if (type === 1) {
                                                            return subject?.manager?.username === item?.username ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.username
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.username}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.username
                                                                    }
                                                                >
                                                                    {item?.username}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.username
                                                                    }
                                                                >
                                                                    {item?.username}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </CFormSelect>}
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="formFile">
                                                    Expert
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    onChange={(e) =>
                                                        setExpert(e.target.value)
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option>Select expert</option>
                                                    {listExpert?.map((item, index) => {
                                                        if (type === 1) {
                                                            return subject?.expert
                                                                ?.id ===
                                                                item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.user?.fullname}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                >
                                                                    {item?.user?.fullname}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                >
                                                                    {item?.user?.fullname}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </CFormSelect>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Note (
                                            <span style={{ color: "red" }}>*</span>)
                                        </CFormLabel>
                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            defaultValue={
                                                type === 1 ? subject?.note : ""
                                            }
                                            onChange={(e) =>
                                                setNote(e.target.value)
                                            }
                                            rows="3"
                                        >
                                        </CFormTextarea>
                                    </div>
                                    <div className="mb-3">
                                        <CButton type="submit">
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

export default SubjectDetail;
