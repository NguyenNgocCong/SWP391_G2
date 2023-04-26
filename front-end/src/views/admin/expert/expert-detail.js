import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
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

function ExpertDetail(props) {
    const [expert, setExpert] = useState();
        // eslint-disable-next-line
    const [status, setStatus] = useState();
    const [username, setUsername] = useState();
    const [fullname, setFullname] = useState();
    const [phone, setPhone] = useState();
    const [company, setCompany] = useState();
    const [jobTitle , setJobTitle] = useState();
    const [description , setDescription ] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState();
    const [preview, setPreview] = React.useState();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/experts/".length,
        location.pathname.length
    );
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

    const getExpertById = async () => {
        try {
            const response = await adminApi.getExpertById(id);
            setExpert(response);
        } catch (responseError) {
            console.log(responseError)
            toast.error(responseError?.message, {
                duration: 2000,
            });
        }
    };

    const handleUpdatePost = async (e) => {
        try {
            const params = {
                userId:expert.user?.id,
                username: username,
                fullname: fullname,
                phone: phone,
                company: company,
                jobTitle: jobTitle,
                description: description,
                status: status
            };
            const response = await adminApi.updateExpert(id, params, thumbnailUrl)
            // setHasUpdate(!hasUpdate);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/experts");
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const handleThumbnail = (e) => {
        const fileDropped = e.target.files[0];
        setThumbnailUrl(fileDropped)
        const previewUrl = URL.createObjectURL(fileDropped);
        setPreview(previewUrl);
    }

    useEffect(() => {
        getExpertById();
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
                                <strong>Thông tin chuyên gia</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={8}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Username (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="username"
                                                id="exampleFormControlInput1"
                                                placeholder="UserName"
                                                defaultValue={expert?.user?.username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Email (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="email"
                                                id="exampleFormControlInput1"
                                                placeholder="Email"
                                                disabled={true}
                                                defaultValue={expert?.user?.email}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Họ và tên (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="fullname"
                                                id="exampleFormControlInput1"
                                                placeholder="FullName"
                                                defaultValue={expert?.user?.fullname}
                                                onChange={(e) =>
                                                    setFullname(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Phone (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="phone"
                                                id="exampleFormControlInput1"
                                                placeholder="Phone"
                                                defaultValue={expert?.user?.phoneNumber}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Ảnh đại diện (
                                            <span style={{ color: "red" }}>*</span>)
                                        </CFormLabel>
                                        <CImage
                                            rounded
                                            thumbnail
                                            src={!preview ? (expert?.user.avatar != null && expert?.user.avatar) ? combieImg(expert?.user.avatar) : img : preview}
                                            width={400}
                                            style={{ maxHeight: '240px' }}
                                            onLoad={() => URL.revokeObjectURL(preview)}
                                        />
                                        <CFormInput
                                            className="form-control"
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => handleThumbnail(e)}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={12}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Công ty (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="company"
                                                id="exampleFormControlInput1"
                                                placeholder="Company"
                                                defaultValue={expert?.company}
                                                onChange={(e) =>
                                                    setCompany(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Công việc (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="jobTitle"
                                                id="exampleFormControlInput1"
                                                placeholder="Job title"
                                                defaultValue={expert?.jobTitle}
                                                onChange={(e) =>
                                                    setJobTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Mô tả (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={expert?.description}
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
                                        onClick={(e) => handleUpdatePost(e)}
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

export default ExpertDetail;
