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
import {
    AppFooter,
    AppHeader,
    AppSidebar,
} from "../component";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { combieImg } from "../../../utils";

function PackagesDetail(props) {
    const [packages, setPackage] = useState();
    const [listSubject, setListSubject] = useState([]);
    const [status, setStatus] = useState(0);
    const [title, setTitle] = useState();
    const [excerpt, setExcerpt] = useState();
    const [duration, setDuration] = useState();
    const [description, setDescription] = useState();
    const [listPrice, setListPrice] = useState();
    const [salePrice, setSalePrice] = useState();
    const [subjectId, setSubjectId] = useState();
    const [preview, setPreview] = useState();
    const [image, setImage] = useState();
    const location = useLocation();
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const id = location.pathname.substring(
        "/admin/packages/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getPackageById = async () => {
        try {
            const response = await adminApi.getPackageById(id);
            setPackage(response);
            setStatus(response.status);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getAllSubject = async () => {
        try {
            const response = await adminApi.getAllSubject(0, 100, "", 0, true);
            setListSubject(response.data);
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
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";
    const handleSubmit = async (event) => {
        try {
            const form = event.currentTarget
            setValidated(true)
            event.preventDefault()
            event.stopPropagation()
            if (form.checkValidity()) {
                const params = {
                    status: status,
                    title: title,
                    excerpt: excerpt,
                    duration: duration,
                    description: description,
                    listPrice: listPrice,
                    salePrice: salePrice,
                    subjectId: subjectId,
                };
                const response =
                    type === 1
                        ? await adminApi.updatePackage(id, image, params)
                        : await adminApi.createPackage(image, params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/packages");
            }
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const optionStatus = [
        { status: false, label: "Không hoạt động" },
        { status: true, label: "Hoạt động" },
    ];

    useEffect(() => {
        if (type === 1) {
            getPackageById(id);
        }
        getAllSubject();
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
                                <strong>Thông tin Packages</strong>
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
                                                        type === 1 ? packages?.title : ""
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
                                                    Tóm tắt (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    defaultValue={
                                                        type === 1 ? packages?.excerpt : ""
                                                    }
                                                    onChange={(e) =>
                                                        setExcerpt(e.target.value)
                                                    }
                                                    feedbackInvalid="Please enter Excerpt!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <CRow>
                                                <CCol sm={12}>
                                                    <div className="mb-3">
                                                        <CFormLabel>
                                                            Thời hạn (
                                                            <span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        <CFormInput
                                                            type="number"
                                                            id="exampleFormControlInput1"
                                                            defaultValue={
                                                                type === 1 ? packages?.duration : ""
                                                            }
                                                            onChange={(e) =>
                                                                setDuration(e.target.value)
                                                            }
                                                            feedbackInvalid="Please enter Duration!"
                                                            required
                                                            tooltipFeedback
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol sm={12}>
                                                    <div className="mb-3">
                                                        <CFormLabel>
                                                            Giá bán (
                                                            <span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        <CFormInput
                                                            type="text"
                                                            id="exampleFormControlInput1"
                                                            defaultValue={
                                                                type === 1 ? packages?.listPrice : ""
                                                            }
                                                            onChange={(e) =>
                                                                setListPrice(e.target.value)
                                                            }
                                                            feedbackInvalid="Please enter List Price!"
                                                            required
                                                            tooltipFeedback
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol sm={12}>
                                                    <div className="mb-3">
                                                        <CFormLabel>
                                                            Giá khuyến mãi (
                                                            <span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        <CFormInput
                                                            type="text"
                                                            id="exampleFormControlInput1"
                                                            defaultValue={
                                                                type === 1 ? packages?.salePrice : ""
                                                            }
                                                            onChange={(e) =>
                                                                setSalePrice(e.target.value)
                                                            }
                                                            feedbackInvalid="Please enter Sale Price!"
                                                            required
                                                            tooltipFeedback
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol sm={12}>
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
                                                                    return packages?.status ===
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
                                                <CCol sm={12}>
                                                    <div className="mb-3">
                                                        <CFormLabel htmlFor="formFile">
                                                            Môn học (
                                                            <span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        <CFormSelect
                                                            aria-label="Default select example"
                                                            onChange={(e) =>
                                                                setSubjectId(e.target.value)
                                                            }
                                                            feedbackInvalid="Please choose Subject!"
                                                            required
                                                            tooltipFeedback
                                                        >
                                                            <option value="">Chọn môn học</option>
                                                            {listSubject?.map((item, index) => {
                                                                if (type === 1) {
                                                                    return packages?.sucjectCode.id === item?.id ? (
                                                                        <option
                                                                            key={index}
                                                                            value={
                                                                                item?.id
                                                                            }
                                                                            selected
                                                                        >
                                                                            {item?.name}
                                                                        </option>
                                                                    ) : (
                                                                        <option
                                                                            key={index}
                                                                            value={
                                                                                item?.id
                                                                            }
                                                                        >
                                                                            {item?.name}
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
                                                                            {item?.name}
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
                                                    src={!preview ? (packages?.image != null && packages?.image) ? combieImg(packages?.image) : img : preview}
                                                    width={1200}
                                                    style={{ maxHeight: '450px', display: 'block', margin: 'auto' }}
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
                                        <CCol sm={12}>
                                            <div className="mb-3">
                                                <CFormLabel>
                                                    Mô tả (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={packages?.description}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setDescription(data);
                                                    }}
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

export default PackagesDetail;
