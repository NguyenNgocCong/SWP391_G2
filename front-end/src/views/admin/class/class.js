import { cilLibraryAdd, cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CFormInput, CFormSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import Styles from "./style.module.scss";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";

function Class() {
  const columns = [
    {
      name: "STT",
      width: "50px",
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Mã lớp học",
      minWidth: "120px",
      maxWidth: "150px",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Lịch",
      minWidth: "80px",
      maxWidth: "150px",
      selector: (row) => row.schedule,
      sortable: true,
    },
    {
      name: "Thời gian",
      minWidth: "80px",
      maxWidth: "150px",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Khóa học",
      minWidth: "225px",
      maxWidth: "275px",
      selector: (row) => row.packages.title,
      sortable: true,
    },
    {
      name: "Ngày bắt đầu",
      minWidth: "130px",
      maxWidth: "150px",
      selector: (row) => new Date(row.dateFrom).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Ngày kết thúc",
      minWidth: "130px",
      maxWidth: "150px",
      selector: (row) => new Date(row.dateTo).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Giảng viên",
      minWidth: "170px",
      maxWidth: "250px",
      selector: (row) => row.trainer?.user?.fullname,
      sortable: true,
    },
    {
      name: "Chi nhánh",
      minWidth: "120px",
      maxWidth: "200px",
      selector: (row) => (
        <div className={`${row?.branch ? Styles.inactive : Styles.active}`}>
          {row.branch ? row?.branch.setting_title : "Online"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Trạng thái",
      width: "150px",
      selector: (row) => (
        <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
          {row.status ? "Hoạt động" : "Không hoạt động"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      width: "250px",
      selector: (row) => (
        // <CButton href={`/react/admin/class/${row?.id}`} color="primary">
        //   <CIcon icon={cilPen} />
        // </CButton>
        <div className={Styles.inputSearch}>
          <button
            onClick={() => {
              window.location.href = "/admin/class/" + row?.id;
            }}
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
            style={{ backgroundColor: "#7367f0", height: "30px", width: "120px", border: "none", float: 'right' }}
            onClick={() => submit(row)}
          >
            {row?.status ? "Tắt hoạt động" : "Bật hoạt động"}
          </button>
        </div>
      ),
    },
  ];
  const history = useHistory();
  const [data, setDataTable] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [listTraner, setListTrainer] = useState([]);
  const [traner, setTrainer] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const getAllClass = async () => {
    try {
      const response = await adminApi.getAllClass(
        page,
        itemsPerPage,
        keywordSearch,
        traner,
        status
      );
      setDataTable(response.data);
      setTotalRows(response.totalItems);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const handleUpdateStatus = async (row) => {
    try {
      const params = {
        status: !row?.status,
      };
      const response = await adminApi.updateClass(params, row?.id);
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

  const getListTrainer = async () => {
    try {
      const response = await adminApi.getListExperts(0, 50, "");
      setListTrainer(response.data);
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
    getAllClass();
    // eslint-disable-next-line
  }, [isModify, keywordSearch, status, traner, itemsPerPage, page]);

  useEffect(() => {
    getListTrainer();
    // eslint-disable-next-line
  }, []);

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
                    setTrainer(e.target.value);
                  }}
                >
                  <option value={0}>Tất cả giảng viên</option>
                  {listTraner.map((item, index) => {
                    return (
                      <option key={index} value={item?.id}>
                        {item?.user.fullname}
                      </option>
                    );
                  })}
                </CFormSelect>
              </Col>
              <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                <CFormSelect
                  aria-label="Default select example"
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
                  }}
                  onClick={() => history.push("/admin/class/create")}
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
          />{" "}
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Class;
