import { CFormInput, CFormSelect } from "@coreui/react";
import Styles from "./style.module.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { FaDatabase } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilLibraryAdd, cilPen } from "@coreui/icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Row, Col } from "react-bootstrap";

function Subjects() {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Mã môn học",
      minWidth: "100px",
      maxWidth: "150px",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Tên môn học",
      minWidth: "200px",
      maxWidth: "250px",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Quản lí",
      minWidth: "120px",
      maxWidth: "150px",
      selector: (row) => (
        <>
          <FaDatabase color="#28C76F" style={{ marginRight: "5px" }} />
          {row.manager?.username}
        </>
      ),
      sortable: true,
    },
    {
      name: "Chuyên gia",
      minWidth: "120px",
      maxWidth: "150px",
      selector: (row) => row.expert?.user?.username,
      sortable: true,
    },
    {
      name: "Phân loại",
      minWidth: "120px",
      maxWidth: "150px",
      selector: (row) => row.category?.setting_title,
      sortable: true,
    },
    {
      name: "Trạng thái",
      maxWidth: "150px",
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
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => {
              window.location.href = "/admin/subjects/" + row?.id;
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
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const history = useHistory();

  const getAllSubject = async () => {
    try {
      const response = await adminApi.getAllSubject(page, itemsPerPage, keywordSearch, category, status);
      setDataTable(response.data);
      setTotalRows(response.totalItems);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const submit = (row) => {
    confirmAlert({
      title: "Xác nhận thay đổi Status",
      message: "Bạn có chắc chắn về điều đó",
      buttons: [
        {
          label: "Có",
          onClick: () => handleUpdateActiveSubject(row),
        },
        {
          label: "Không",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const handleUpdateActiveSubject = async (row) => {
    try {
      const params = {
        status: !row?.status,
      };
      const response = await adminApi.updateSubject(params, row?.id);
      toast.success(response?.message, {
        duration: 2000,
      });
      setIsModify(!isModify);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const getListCategory = async () => {
    try {
      const response = await adminApi.getListCategorySubject();
      setListCategory(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const onSearch = async (e) => {
    setKeywordSearch(e.target.value);
  };

  useEffect(() => {
    getAllSubject();
    // eslint-disable-next-line
  }, [isModify, keywordSearch, page, status, category,itemsPerPage]);

  useEffect(() => {
    getListCategory();
  }, []);

  const handlePerRowsChange = async (newPerPage) => {
    setItemsPerPage(newPerPage);
  }

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
                  <option value={0}>Tất cả</option>
                  {listCategory.map((item, index) => {
                    return (
                      <option key={index} value={item?.setting_id}>
                        {item?.setting_title}
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
                <button
                  style={{
                    backgroundColor: "#7367f0",
                    border: "none",
                    float: "right",
                    height: "100%",
                    width: "100px",
                    color: "white",
                    borderRadius: "10px",
                    marginRight: "inherit",
                  }}
                  onClick={() => history.push("/admin/subjects/create")}
                >
                  <CIcon icon={cilLibraryAdd} />
                </button>
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
}

export default Subjects;
