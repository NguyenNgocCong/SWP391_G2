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
    CImage,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { combieImg } from "../../../utils";
import {
    AppFooter,
    AppHeader,
    AppSidebar
} from "../component";

function SliderDetail(props) {
    const [slider, setSlider] = useState();
    const [validTo, setValidTo] = useState();
    const [title, setTitle] = useState();
    const [url, setURL] = useState();
    const [status, setStatus] = useState(0);
    const [preview, setPreview] = useState();
    const [image, setImage] = useState();
    const [validated, setValidated] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/sliders/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

    const getSliderById = async () => {
        try {
            const response = await adminApi.getSliderById(id);
            setSlider(response);
            setValidTo(response?.validTo);
            setStatus(response.status);
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
                    validTo: validTo,
                    status: status,
                    title: title,
                    url: url
                };
                const response =
                    type === 1
                        ? await adminApi.updateSlider(id, image, params)
                        : await adminApi.createSlider(image, params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/sliders");
            }
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const handleThumbnail = (e) => {
        const fileDropped = e.target.files[0];
        setImage(fileDropped)
        const previewUrl = URL.createObjectURL(fileDropped);
        setPreview(previewUrl);
    }

    const optionStatus = [
        { status: 0, label: "Nháp" },
        { status: 1, label: "Được phát hành" },
        { status: 2, label: "Hoàn thành" },
    ];

    useEffect(() => {
        if (type === 1) {
            getSliderById();
        }
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
                                <strong>Thông tin Sliders</strong>
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
                                            <CRow className="g-3 mb-3">
                                                <CCol sm={11}>
                                                    <div className="mb-3">
                                                        <CFormLabel>
                                                            Tiêu đề (
                                                            <span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        <CFormInput
                                                            type="text"
                                                            id="exampleFormControlInput1"
                                                            defaultValue={
                                                                type === 1 ? slider?.title : ""
                                                            }
                                                            onChange={(e) =>
                                                                setTitle(e.target.value)
                                                            }
                                                            feedbackInvalid="Không được để trống!"
                                                            required
                                                            tooltipFeedback
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol sm={11}>
                                                    <div className="mb-3">
                                                        <CFormLabel>
                                                            Đường dẫn (
                                                            <span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        <CFormInput
                                                            type="text"
                                                            id="exampleFormControlInput1"
                                                            defaultValue={
                                                                type === 1 ? slider?.url : ""
                                                            }
                                                            onChange={(e) =>
                                                                setURL(e.target.value)
                                                            }
                                                            feedbackInvalid="Không được để trống!"
                                                            required
                                                            tooltipFeedback
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol sm={11}>
                                                    <div className="mb-3">
                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                            Hạn bài đăng (
                                                            <span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        {/* <DatePicker selected={validTo} onChange={(date) => setValidTo(new Date(date))} /> */}
                                                        <CFormInput
                                                            type="date"
                                                            id="exampleFormControlInput1"
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
                                                                setValidTo(
                                                                    new Date(e.target.value)
                                                                )
                                                            }
                                                            feedbackInvalid="Không được để trống!"
                                                            required
                                                            tooltipFeedback
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol sm={11} >
                                                    <div className="mb-3">
                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                            Trạng thái
                                                        </CFormLabel>
                                                        <CFormSelect
                                                            id="autoSizingSelect"
                                                            onChange={(e) => setStatus(e.target.value)}
                                                            disabled={type !== 1}
                                                        >
                                                            {optionStatus.map((item, index) => {
                                                                if (type === 1) {
                                                                    return slider?.status ===
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
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Ảnh (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <br />
                                                <CImage
                                                    rounded
                                                    thumbnail
                                                    src={!preview ? (slider?.imageUrl != null && slider?.imageUrl) ? combieImg(slider?.imageUrl) : img : preview}
                                                    width={1200}
                                                    style={{ maxHeight: '305px', display: 'block', margin: 'auto' }}
                                                    onLoad={() => URL.revokeObjectURL(preview)}
                                                />
                                                <CFormInput
                                                    
                                                    className="form-control"
                                                    type="file"
                                                    accept=".jpg, .png, .jpeg"
                                                    onChange={(e) => handleThumbnail(e)}

                                                />
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

export default SliderDetail;
