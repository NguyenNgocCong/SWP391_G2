import { cilLibraryAdd, cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CFormInput, CFormSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import Styles from "./style.module.scss";

const Packages = () => {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Tiêu đề",
      minWidth: "200px",
      maxWidth: "300px",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Tóm tắt",
      minWidth: "200px",
      maxWidth: "300px",
      selector: (row) => row.excerpt,
      sortable: true,
    },
    {
      name: "Thời hạn",
      minWidth: "100px",
      maxWidth: "150px",
      selector: (row) => row.duration + " Tháng",
      sortable: true,
    },
    {
      name: "Môn Học",
      minWidth: "100px",
      maxWidth: "200px",
      selector: (row) => row.sucjectCode?.name,
      sortable: true,
    },
    {
      name: "Giá niêm yết",
      minWidth: "100px",
      maxWidth: "140px",
      selector: (row) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.listPrice),
      sortable: true,
    },
    {
      name: "Giá bán",
      minWidth: "100px",
      maxWidth: "140px",
      selector: (row) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.salePrice),
      sortable: true,
    },
    {
      name: "Trạng thái",
      minWidth: "100px",
      maxWidth: "120px",
      selector: (row) => (
        <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
          <strong>{row.status ? "Hoạt động" : "Không hoạt động"}</strong>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      width: "250px",
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => {
              window.location.href = "/admin/packages/" + row?.id;
            }}
            color="primary"
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "40px",
              border: "none",
              float: "right",
            }}
          >
            <CIcon icon={cilPen} />
          </button>
          <button
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "120px",
              border: "none",
              float: "right",
            }}
            onClick={() => submit(row)}
          >
            {row?.status ? "Tắt hoạt động" : "Bật hoạt động"}
          </button>
        </div>
      ),
    },
  ];
  const [data, setDataTable] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [listsubject, setListSubject] = useState([]);
  const [category, setCategory] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const history = useHistory();
  const handleUpdateStatus = async (row) => {
    try {
      const params = {
        status: !row?.status,
      };
      const response = await adminApi.updatePackage(row?.id, null, params);
      setIsModify(!isModify);
      toast.success(response?.message, {
        duration: 2000,
      });
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const submit = (row) => {
    confirmAlert({
      title: "Xác nhận thay đổi trạng thái",
      message: "Bạn có chắc về điều này",
      buttons: [
        {
          label: "Có",
          onClick: () => handleUpdateStatus(row),
        },
        {
          label: "Không",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };
  const getAllSubject = async () => {
    try {
      const response = await adminApi.getAllSubject(0, 100, "", 0, "");
      setListSubject(response.data);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const getListProduct = async () => {
    try {
      const response = await adminApi.getAllProduct(
        page,
        itemsPerPage,
        keywordSearch,
        category,
        status,
      );
      setDataTable(response.data);
      setTotalRows(response.totalItems);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const onSearch = (e) => {
    setKeywordSearch(e.target.value);
  };
  useEffect(() => {
    getAllSubject();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getListProduct();
    // eslint-disable-next-line
  }, [isModify, keywordSearch, page, status, category,itemsPerPage]);

  const handlePerRowsChange = async (newPerPage) => {
    setItemsPerPage(newPerPage);
  };

  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow px-2">
          <div
            style={{
              backgroundColor: "white",
              padding: "5px 0px",
              margin: "0px 0px 15px 0px",
            }}
          >
            <Row className="text-nowrap w-100 my-75 g-0 permission-header">
              <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                <CFormSelect
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={0}>Tất cả môn học</option>
                  {listsubject?.map((item, index) => {
                    return (
                      <option key={index} value={item?.id}>
                        {item?.name}
                      </option>
                    );
                  })}
                </CFormSelect>
              </Col>
              <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                <CFormSelect
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value={true}>Hoạt động</option>
                  <option value={false}>Không hoạt động</option>
                </CFormSelect>
              </Col>
              <Col xs={12} lg={4} style={{ padding: "5px 10px" }}>
                <CFormInput
                  type="text"
                  id="exampleInputPassword1"

                  placeholder="Tìm kiếm..."
                  onChange={onSearch}
                />
              </Col>
              <Col xs={12} lg={4} className='d-flex justify-content-end' style={{ padding: "5px 10px" }}>
                <div className={Styles.inputSearch}>
                  <button
                    style={{
                      backgroundColor: "#7367f0",
                      border: "none",
                      float: "right",
                    }}
                    onClick={() => history.push("/admin/packages/create")}
                  >
                    <CIcon icon={cilLibraryAdd} />
                  </button>
                </div>
              </Col>
            </Row>
          </div>
          <DataTable
            columns={columns}
            data={data}
            paginationTotalRows={totalRows}
            onChangePage={(page) => setPage(page - 1)}
            itemsPerPage={itemsPerPage}
            onChangeRowsPerPage={handlePerRowsChange}
            pagination
            paginationServer
          />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Packages;
