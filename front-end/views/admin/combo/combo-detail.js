import { cilDelete } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
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
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import Styles from "./style.module.scss";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { combieImg } from "../../../utils";
const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

function ComboDetail(props) {
  const [combo, setCombo] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const location = useLocation();
  const history = useHistory();
  const [preview, setPreview] = useState();
  const [listPackages, setListPackages] = useState([]);
  const [listPackagesSale, setListPackagesSale] = useState([]);
  const [salePrice, setSalePrice] = useState(0);
  const [packages, setPackages] = useState({});
  const [validated, setValidated] = useState(false);
  const [image, setImage] = useState();

  const columns = [
    {
      name: "STT",
      width: "50px",
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Tiêu đề",
      minWidth: "150px",
      width: "200px",
      maxWidth: "250px",
      selector: (row) => row?._package?.title,
      sortable: true,
    },
    {
      name: "Giá bán",
      minWidth: "250px",
      width: "250px",
      maxWidth: "275px",
      selector: (row) => row?._package?.salePrice,
      sortable: true,
    },
    {
      name: "Giá khuyến mãi",
      minWidth: "250px",
      width: "250px",
      maxWidth: "275px",
      selector: (row) => row?.salePrice,
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => deletePackage(row)}
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "40px",
              border: "none",
              float: "right",
            }}
          >
            <CIcon icon={cilDelete} />
          </button>
        </div>
      ),
    },
  ];

  const handleThumbnail = (e) => {
    const fileDropped = e.target.files[0];
    setImage(fileDropped)
    const previewUrl = URL.createObjectURL(fileDropped);
    setPreview(previewUrl);
  }


  const id = location.pathname.substring(
    "/admin/combos/".length,
    location.pathname.length
  );
  const type = id !== "create" ? 1 : 0;

  const getComboById = async () => {
    try {
      const response = await adminApi.getComboById(id);
      setCombo(response);
      const listData = response.comboPackages.filter((item) => item);
      setListPackagesSale(listData);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const deletePackage = async (row) => {
    const listData = listPackagesSale.filter((item) => item !== row);
    setListPackagesSale(listData);
    const listpackage = listPackages.filter((item) => item);
    listpackage.push(row?._package);
    setListPackages(listpackage);
  };

  const getListPackage = async () => {
    try {
      const response = await adminApi.getAllProduct(0, 50, "", 0, "");
      let listpackage = response.data.filter((item) => item);
      listPackagesSale.map((element) => {
        return (listpackage = listpackage.filter(
          (item) => item.id !== element._package?.id
        ));
      });
      setListPackages(listpackage);
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

        if (listPackagesSale?.length > 0) {
          const params = {
            title: title,
            description: description,
            packages: [],
          };
          listPackagesSale.map((element) => {
            const pack = {
              packageId: element?._package?.id,
              salePrice: Number(element?.salePrice),
            };
            return params.packages.push(pack);
          });
          const response =
            type === 1
              ? await adminApi.updateCombo(id, image, params)
              : await adminApi.createCombo(image, params);
          toast.success(response?.message, {
            duration: 2000,
          });
          history.push("/admin/combos");
        } else {
          toast.error("Please import package", {
            duration: 2000,
          });
        }
      }
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const handleAddPackage = async () => {
    if (!packages) {
      toast.error("Hãy chọn khóa học", {
        duration: 1000,
      });
    } else if (parseInt(salePrice) === 0) {
      toast.error("Nhập giá khuyến mãi", {
        duration: 1000,
      });
    } else if (parseInt(salePrice) > parseInt(packages?.salePrice)) {
      toast.error("Giá khuyến mãi phải nhỏ hơn giá bán gốc", {
        duration: 1000,
      });
    } else {
      const listData = listPackagesSale.filter((item) => item);
      listData.push({ _package: packages, salePrice: salePrice });
      const listpackage = listPackages.filter((item) => item !== packages);
      setListPackagesSale(listData);
      setListPackages(listpackage);
      setPackages({});
      setSalePrice(0);
    }
  };

  useEffect(() => {
    if (type === 1) {
      getComboById(id);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (listPackages.length === 0) {
      getListPackage();
    }
    // eslint-disable-next-line
  }, [listPackagesSale]);

  const handleSelectPackage = async (val) => {
    setPackages(listPackages.find((element) => element?.id === parseInt(val)));
  };


  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Thông tin combo</strong>
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
                      <CCol sm={12}>
                        <div className="mb-3">
                          <CFormLabel>
                            Tiêu đề (<span style={{ color: "red" }}>*</span>)
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            defaultValue={type === 1 ? combo?.title : ""}
                            onChange={(e) => setTitle(e.target.value)}
                            feedbackInvalid="Please enter Title!"
                            required
                            tooltipFeedback
                          />
                        </div>
                      </CCol>
                      <CCol sm={12}>
                        <div className="mb-3">
                          <CFormLabel>
                            Mô tả (<span style={{ color: "red" }}>*</span>)
                          </CFormLabel>
                          <CKEditor
                            editor={ClassicEditor}
                            data={combo?.description}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setDescription(data);
                            }}
                          />
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
                        src={!preview ? (combo?.image != null && combo?.image) ? combieImg(combo?.image) : img : preview}
                        width={1200}
                        style={{ maxHeight: '305px', display: 'block', margin: 'auto' }}
                        onLoad={() => URL.revokeObjectURL(preview)}
                      />
                      <CFormInput
                        feedbackInvalid="Please choose Img!"
                        tooltipFeedback
                        className="form-control"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={(e) => handleThumbnail(e)}

                      />
                    </div>
                  </CCol>
                </CRow>
                <h5>Thông tin khóa học</h5>
                <hr></hr>
                <CRow className="g-3 mb-3">
                  <CCol sm={5}>
                    <div className="d-flex form-row-inline label-medium">
                      <CFormLabel style={{ marginRight: "10px" }}>
                        Khóa học:
                      </CFormLabel>
                      <CFormSelect
                        id="autoSizingSelect"
                        value={packages?.id ? packages?.id : ""}
                        onChange={(e) => handleSelectPackage(e.target.value)}
                      >
                        <option value="">Select package</option>
                        {listPackages?.map((item, index) => {
                          return (
                            <option key={index} value={item?.id}>
                              {item?.title}
                            </option>
                          );
                        })}
                      </CFormSelect>
                    </div>
                  </CCol>
                  <CCol sm={3}>
                    <CRow>
                      <CCol sm={2}>
                        <CFormLabel>Giá bán:</CFormLabel>
                      </CCol>
                      <CCol sm={10}>
                        <CFormInput
                          type="number"
                          disabled={true}
                          id="exampleFormControlInput1"
                          defaultValue={packages?.salePrice}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm={3}>
                    <CRow>
                      <CCol sm={4} className="d-flex justify-content-end">
                        <CFormLabel>Giá khuyến mãi:</CFormLabel>
                      </CCol>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          id="exampleFormControlInput1"
                          value={salePrice}
                          placeholder="Enter sale price"
                          onChange={(e) => setSalePrice(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm={1}>
                    <CButton onClick={() => handleAddPackage()}>Thêm</CButton>
                  </CCol>
                  <CCol sm={12}>
                    <DataTable
                      columns={columns}
                      data={listPackagesSale}
                      paginationServer
                    />
                  </CCol>
                </CRow>
                <div className="mb-3">
                  <CButton type="submit">
                    {type === 1 ? "Lưu" : "Thêm"}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default ComboDetail;
