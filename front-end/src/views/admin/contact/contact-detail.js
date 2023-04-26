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
import { userApi } from "../../../api/userApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar
} from "../component";

function ContactDetail(props) {
    const [contact, setContact] = useState();
    const [note, setNote] = useState();
    const history = useHistory();
    const location = useLocation();
    const id = location.pathname.substring(
        "/admin/contacts/".length,
        location.pathname.length
    );

    const getContactById = async () => {
        const response = await adminApi.getContactById(id);
        setContact(response);
    };


    const handleUpdateContact = async () => {
        try {
            const params = {
                note: note,
            };
            const response = await adminApi.updateContact(params, id);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push('/admin/contacts');
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getContactById();
        // eslint-disable-next-line
    }, [id]);

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
                                <strong>Thông tin Contact</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Email
                                            </CFormLabel>
                                            <CFormInput
                                                type="email"
                                                id="exampleFormControlInput1"
                                                defaultValue={contact?.email}
                                                readOnly
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Họ và tên
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder=""
                                                defaultValue={contact?.fullName}
                                                readOnly
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Phân loại
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder=""
                                                defaultValue={contact?.category?.setting_title}
                                                readOnly
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Số điện thoại
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder=""
                                                readOnly
                                                defaultValue={contact?.phoneNumber}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Câu hỏi
                                    </CFormLabel>
                                    <CFormTextarea
                                        id="exampleFormControlTextarea1"
                                        defaultValue={contact?.message}
                                        readOnly
                                        rows="3"
                                    >
                                    </CFormTextarea>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Ghi chú
                                    </CFormLabel>
                                    <CFormTextarea
                                        id="exampleFormControlTextarea1"
                                        defaultValue={contact?.note}
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                        rows="3"
                                    >
                                    </CFormTextarea>
                                </div>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdateContact()}
                                    >
                                        Lưu
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default ContactDetail;
