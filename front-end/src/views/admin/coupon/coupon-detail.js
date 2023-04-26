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

function CouponDetail(props) {

    const [detailCoupon, setDetailCoupon] = useState();
    const [validFrom, setValidFrom] = useState();
    const [validTo, setValidTo] = useState();
    const [code, setCode] = useState();
    const [maxQuantity, setMaxQuantity] = useState();
    const [discountRate, setDiscountRate] = useState();
    const [status, setStatus] = useState();
    const [validated, setValidated] = useState(false);
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/coupon/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getCouponById = async () => {
        try { 
            const response = await adminApi.getCouponDetail(id);
            setDetailCoupon(response);
            setValidFrom(response?.validFrom);
            setValidTo(response?.validTo);
            setStatus(response.status);
            setCode(response?.code);
            setMaxQuantity(response?.quantity);
            setDiscountRate(response?.discountRate);
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
                    quantity: maxQuantity,
                    discountRate: discountRate,
                    status: status,
                    validFrom: validFrom,
                    validTo: validTo,
                };

                const response =
                    type === 1
                        ? await adminApi.updateCoupon(params, id)
                        : await adminApi.createCoupon(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/coupon");
            }
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getCouponById();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => { }, [validFrom, validTo]);

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
                                                        validFrom
                                                            ? new Date(
                                                                validFrom
                                                            ).toLocaleDateString("en-CA")
                                                            : new Date(
                                                                ""
                                                            ).toLocaleDateString("en-CA")
                                                    }
                                                    onChange={(e) =>
                                                        setValidFrom(
                                                            new Date(e.target.value)
                                                        )
                                                    }
                                                    feedbackInvalid="Please enter Valid From!"
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
                                                        validTo
                                                            ? new Date(
                                                                validTo
                                                            ).toLocaleDateString("en-CA")
                                                            : new Date(
                                                                ""
                                                            ).toLocaleDateString("en-CA")
                                                    }
                                                    onChange={(e) =>
                                                        setValidTo(new Date(e.target.value))
                                                    }
                                                    feedbackInvalid="Please enter Valid To!"
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
                                                            return detailCoupon?.status ===
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
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Số lượng(
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={maxQuantity}
                                                    onChange={(e) =>
                                                        setMaxQuantity(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Max Quantity!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Chiết khấu(
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={discountRate}
                                                    onChange={(e) =>
                                                        setDiscountRate(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Discount Rate!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        {type === 1 ? <CCol sm={12}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Code(
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="code"
                                                    readOnly={true}
                                                    id="exampleFormControlInput1"
                                                    placeholder="Code"
                                                    defaultValue={code}
                                                    onChange={(e) =>
                                                        setCode(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </CCol>
                                            : <></>
                                        }
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

export default CouponDetail;
