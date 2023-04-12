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

function FeedbackDetail(props) {

    const [detailFeedback, setDetailFeedback] = useState();
    const [body, setBody] = useState();
    const [email, setEmail] = useState();
    const [vote, setVote] = useState();
    const [validated, setValidated] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/feedback/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getFeedbackById = async () => {
        try {
            const response = await adminApi.getFeedbackDetail(id);
            setDetailFeedback(response);
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
                    body: body,
                    vote: vote,
                    email: email
                };

                const response =
                    type === 1
                        ? await adminApi.updateFeedback(params, id)
                        : await adminApi.createFeedback(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/feedback");
            }
        } catch (responseError) {
            toast.error(responseError.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getFeedbackById();
        }
        // eslint-disable-next-line
    }, []);

    const optionStatus = [
        { status: 1, label: "1" },
        { status: 2, label: "2" },
        { status: 3, label: "3" },
        { status: 4, label: "4" },
        { status: 5, label: "5" }
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
                                        ? "Thông tin mã giảm giá"
                                        : "Tạo mã giảm giá mới"}
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
                                        <CCol sm={4}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Email (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    id="exampleFormControlInput1"
                                                    defaultValue={detailFeedback?.user?.email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Email!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={4}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Nội dung (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    id="exampleFormControlInput1"
                                                    defaultValue={detailFeedback?.body}
                                                    onChange={(e) =>
                                                        setBody(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Body!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={4}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Vote (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    onChange={(e) =>
                                                        setVote(e.target.value)
                                                    }
                                                    feedbackInvalid="Please choose Status!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Chọn trạng thái</option>
                                                    {optionStatus?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailFeedback?.vote ===
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

export default FeedbackDetail;
