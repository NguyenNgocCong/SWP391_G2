import { CFormInput, CFormSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { adminApi } from "../../../../api/adminApi";
import Styles from "../style.module.scss";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Col, Row } from "react-bootstrap";

function TraineeOnline() {
  const columns = [
    {
      name: "STT",
      width: "50px",
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Tên tài khoản",
      minWidth: '140px',
      maxWidth: '180px',
      selector: (row) => row?.user.username,
      sortable: true,
    },
    {
      name: "Email",
      minWidth: "200px",
      maxWidth: "250px",
      selector: (row) => row.user.email,
      sortable: true,
    },
    {
      name: "Họ và tên",
      minWidth: "200px",
      maxWidth: "250px",
      selector: (row) => row.user.fullname,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      minWidth: "140px",
      maxWidth: "180px",
      selector: (row) => row.user.phoneNumber,
      sortable: true,
    },
    {
      name: "Khóa học",
      minWidth: "150px",
      maxWidth: "250px",
      selector: (row) => row.apackage?.title,
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
    }
  ];
  const [data, setDataTable] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [listClass, setListClass] = useState([]);
  const [trainer, setTrainer] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const getAllClass = async () => {
    try {
      const response = await adminApi.getAllTraineeOnl(page, itemsPerPage, keywordSearch, trainer, status);
      setDataTable(response.data);
      setTotalRows(response.totalItems);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const getListTrainer = async () => {
    try {
      const response = await adminApi.getAllPackageView(0, 50, "", 0, "");
      setListClass(response.data);
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
  }, [keywordSearch, status, trainer, itemsPerPage, page]);

  useEffect(() => {
    getListTrainer();
    // eslint-disable-next-line
  }, []);

  const handlePerRowsChange = async (newPerPage) => {
    setItemsPerPage(newPerPage);
  };

  return (
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
              <option value={0}>Tất cả khóa học</option>
              {listClass?.map((item, index) => {
                return (
                  <option key={index} value={item?.id}>
                    {item?.title}
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
  );
}

export default TraineeOnline;
