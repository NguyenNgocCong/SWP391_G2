import { cilLibraryAdd, cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import Styles from "./style.module.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";

function Class() {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Code",
      minWidth: '140px',
      width: '150px',
      maxWidth: '160px',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Số lượng",
      width: '130px',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Chiết khấu",
      width: '130px',
      selector: (row) => row.discountRate + "%",
      sortable: true,
    },
    {
      name: "Trạng thái",
      width: '120px',
      selector: (row) => (
        <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
          {row.status ? "Hoạt động" : "Không hoạt động"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Ngày bắt đầu",
      width: '150px',
      selector: (row) => new Date(row.validFrom).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Ngày kết thúc",
      width: '150px',
      selector: (row) => new Date(row.validTo).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      selector: (row) => (
        // <CButton href={`/react/admin/class/${row?.id}`} color="primary">
        //   <CIcon icon={cilPen} />
        // </CButton>
        <div className={Styles.inputSearch}>
          <button
            onClick={() => { window.location.href = "/admin/coupon/" + row?.id }}
            style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
          >
            <CIcon icon={cilPen} />
          </button>
        </div>
      ),
    },
  ];
  const history = useHistory();
  const [data, setDataTable] = useState([]);
  // eslint-disable-next-line
  const [isModify, setIsModify] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const getAllCoupon = async () => {
    try {
      const response = await adminApi.getAllCoupon(page, itemsPerPage);
      setDataTable(response.data);
      setTotalRows(response.totalItems)
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getAllCoupon();
    // eslint-disable-next-line
  }, [isModify, itemsPerPage, page]);



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
          <div style={{ backgroundColor: "white", padding: "5px 0px", margin: "0px 0px 15px 0px" }}>
            <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
              <Col xs={12} lg={12} className='d-flex justify-content-end' style={{ padding: "5px 10px" }}>
                <button
                  style={{ backgroundColor: "#7367f0", border: "none", float: 'right', height: '35px', width: '100px', color: 'white', borderRadius: '10px' }}
                  onClick={() =>
                    history.push(
                      "/admin/coupon/create"
                    )
                  }
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
          /> </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Class;
