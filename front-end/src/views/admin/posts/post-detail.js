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
import Cookies from "js-cookie";
import { combieImg } from "../../../utils";

function PostDetail(props) {
    const [listCategory, setListCategory] = useState([]);
    const [post, setPost] = useState();
    const [title, setTitle] = useState();
    const [categoryId, setCategoryId] = useState();
    const [briefInfo, setBriefInfo] = useState();
    const [status, setStatus] = useState(0);
    // eslint-disable-next-line
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState();
    const [preview, setPreview] = React.useState();
    const location = useLocation();
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const id = location.pathname.substring(
        "/admin/posts/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

    const getPostById = async () => {
        try {
            const response = await adminApi.getPostById(id);
            setPost(response);
            setStatus(response.status);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const getListCategory = async () => {
        try {
            const response = await adminApi.getListCategoryPost();
            setListCategory(response);
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
                    title: title,
                    categoryId: categoryId,
                    brefInfo: briefInfo,
                    status: status,
                    author: author,
                    authorId: JSON.parse(Cookies.get("user")).id,
                    body: content
                };
                const response =
                    type === 1
                        ? await adminApi.updatePost(id, params, thumbnailUrl)
                        : await adminApi.createPost(params, thumbnailUrl);
                // setHasUpdate(!hasUpdate);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/posts");
            }
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
        if (type === 1) {
            getPostById();
        }
        getListCategory();
        // eslint-disable-next-line
    }, []);

    const optionStatus = [
        { status: 0, label: "Nháp" },
        { status: 1, label: "Gửi bài viết" }
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
                                <strong>Thông tin bài đăng</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CForm
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Tiêu đề (
                                            <span style={{ color: "red" }}>*</span>)
                                        </CFormLabel>
                                        <CFormInput
                                            type="title"
                                            id="exampleFormControlInput1"
                                            placeholder="Post title"
                                            defaultValue={post?.title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            feedbackInvalid="Không được để trống!"
                                            required
                                            tooltipFeedback
                                        />
                                    </div>
                                    
                                    <CRow className="g-3 mb-3">
                                        <CCol sm={8}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Phân loại (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    id="autoSizingSelect"
                                                    onChange={(e) => setCategoryId(e.target.value)}
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Chọn phân loại</option>
                                                    {listCategory.map((item, index) => {
                                                        if (type === 1) {
                                                            return post?.categoryId ===
                                                                item?.setting_id ? (
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
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Tóm tắt (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="title"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Brief info"
                                                    defaultValue={post?.brefInfo}
                                                    onChange={(e) =>
                                                        setBriefInfo(e.target.value)
                                                    }
                                                    feedbackInvalid="Không được để trống!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
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
                                                            return post?.status ===
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
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Tác giả
                                                </CFormLabel>
                                                <CFormInput
                                                    type="author"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Author full name (author)"
                                                    defaultValue={post?.author.fullname}
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={4}>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Ảnh (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CImage
                                                rounded
                                                thumbnail
                                                src={!preview ? (post?.thumnailUrl != null && post?.thumnailUrl) ? combieImg(post?.thumnailUrl) : img : preview}
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
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Nội dung (
                                            <span style={{ color: "red" }}>*</span>)
                                        </CFormLabel>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={post?.body}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setContent(data);
                                            }}
                                            
                                        />
                                    </div>
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

export default PostDetail;
