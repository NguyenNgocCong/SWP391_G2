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
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";

function ClassDetail(props) {
    const [listTrainer, setListTrainer] = useState();
    const [listBranch, setListBranch] = useState();
    const [listSupporter, setListSupporter] = useState();
    const [detailClass, setDetailClass] = useState();
    const [packageId, setPackageId] = useState(0);
    const [listPackages, setListPackages] = useState([]);
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [trainer, setTrainer] = useState(0);
    const [branch, setBranch] = useState(0);
    const [isOnline, setIsOnline] = useState(true);
    const [supporter, setSupporter] = useState();
    const [status, setStatus] = useState();
    const [schedule, setSchedule] = useState();
    const [code, setCode] = useState();
    const [time, setTime] = useState();
    const [validated, setValidated] = useState(false);
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/class/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getClassById = async () => {
        try {
            const response = await adminApi.getClassDetail(id);
            setDetailClass(response);
            setDateFrom(response?.dateFrom);
            setDateTo(response?.dateTo);
            setStatus(response?.status);
            setIsOnline(response?.branch ? false : true);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getListTrainer = async () => {
        try {
            const response = await adminApi.getListExperts(0, 50, "");
            setListTrainer(response.data);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getListBranch = async () => {
        try {
            const response = await adminApi.getListCategoryBranch();
            setListBranch(response);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getListSupporter = async () => {
        try {
            const response = await adminApi.getListSupporter();
            setListSupporter(response.data);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getListPackage = async () => {
        try {
            const response = await adminApi.getAllProduct(0, 50, "", 0, "");
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
                    packages: packageId,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    code: code,
                    status: status,
                    trainer: trainer,
                    online: isOnline,
                    supporterId: supporter,
                    branch: branch,
                    schedule: schedule,
                    time: time
                };
                const response =
                    type === 1
                        ? await adminApi.updateClass(params, id)
                        : await adminApi.createClass(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/class");
            }
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getClassById();
        }
        if (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") getListTrainer();
        getListPackage();
        getListSupporter();
        getListBranch();
        // eslint-disable-next-line
    }, []);

    useEffect(() => { }, [dateFrom, dateTo]);

    const optionStatus = [
        { status: false, label: "Không hoạt động" },
        { status: true, label: "Hoạt động" },
    ];

    const optionIsOnline = [
        { status: true, label: "Học Online" },
        { status: false, label: "Học trực tiếp" }
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
                                        ? "Thông tin lớp học"
                                        : "Tạo lớp học mới"}
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
                                                    Mã lớp (<span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={type === 1 ? detailClass?.code : ""}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    feedbackInvalid="Please enter code!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Khóa học (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    id="autoSizingSelect"
                                                    onChange={(e) => setPackageId(e.target.value)}
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Chọn khóa học</option>
                                                    {listPackages?.map((item, index) => {
                                                       if (type === 1) {
                                                            return detailClass?.packages.id === item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.title}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
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
                                                                        item?.id
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
                                        <CCol sm={3}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Ngày bắt đầu (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    disabled={isNotAdmin}
                                                    placeholder=""
                                                    value={
                                                        dateFrom
                                                            ? new Date(
                                                                dateFrom
                                                            ).toLocaleDateString("en-CA")
                                                            : new Date(
                                                                ""
                                                            ).toLocaleDateString("en-CA")
                                                    }
                                                    onChange={(e) =>
                                                        setDateFrom(
                                                            new Date(e.target.value)
                                                        )
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={3}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Ngày kết thúc (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    disabled={isNotAdmin}
                                                    placeholder=""
                                                    value={
                                                        dateTo
                                                            ? new Date(
                                                                dateTo
                                                            ).toLocaleDateString("en-CA")
                                                            : new Date(
                                                                ""
                                                            ).toLocaleDateString("en-CA")
                                                    }
                                                    onChange={(e) =>
                                                        setDateTo(new Date(e.target.value))
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={3}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Lịch (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={type === 1 ? detailClass?.schedule : ""}
                                                    onChange={(e) => setSchedule(e.target.value)}
                                                    feedbackInvalid="Please enter Schedule!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={3}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Thời gian (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={type === 1 ? detailClass?.time : ""}
                                                    onChange={(e) => setTime(e.target.value)}
                                                    feedbackInvalid="Please enter Time!"
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
                                                >
                                                    {optionStatus?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.status ===
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
                                                    Giảng viên
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    disabled={isNotAdmin}
                                                    onChange={(e) =>
                                                        setTrainer(e.target.value)
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Chọn giảng viên</option>
                                                    {listTrainer?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.trainer
                                                                ?.id ===
                                                                item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.user?.username}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                >
                                                                    {item?.user?.username}
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
                                                                    {item?.user?.username}
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
                                                    Phương thức học (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    onChange={(e) =>
                                                        setIsOnline(e.target.value === "true")
                                                    }
                                                >
                                                    {optionIsOnline?.map((item, index) => {
                                                        if (type === 1) {
                                                            return isOnline === item?.status ? (
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
                                                    Người hỗ trợ
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    disabled={isNotAdmin}
                                                    onChange={(e) =>
                                                        setSupporter(e.target.value)
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Chọn người hỗ trợ</option>
                                                    {listSupporter?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.supporter
                                                                ?.id ===
                                                                item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.username}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
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
                                                                        item?.id
                                                                    }>
                                                                    {item?.username}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </CFormSelect>
                                            </div>
                                        </CCol>
                                        {isOnline === false ? <CCol sm={12}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="formFile">
                                                    Chi nhánh
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    disabled={isNotAdmin}
                                                    onChange={(e) =>
                                                        setBranch(e.target.value)
                                                    }
                                                >
                                                    <option>Chọ khu vực</option>
                                                    {listBranch?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.branch
                                                                ?.id ===
                                                                item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.setting_value
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.setting_title}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.setting_value
                                                                    }
                                                                >
                                                                    {item?.setting_title}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.setting_value
                                                                    }>
                                                                    {item?.setting_title}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </CFormSelect>
                                            </div>
                                        </CCol> : <></>}
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

export default ClassDetail;
