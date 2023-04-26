import { cilLibraryAdd, cilPen, cilTrash } from "@coreui/icons";
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
import { confirmAlert } from "react-confirm-alert";

function Class() {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Tên tài khoản",
      minWidth: '140px',
      width: '150px',
      maxWidth: '160px',
      selector: (row) => row.user?.username,
      sortable: true,
    },
    {
      name: "Họ và tên",
      minWidth: '140px',
      width: '150px',
      maxWidth: '160px',
      selector: (row) => row.user?.fullname,
      sortable: true,
    },
    {
      name: "Email",
      minWidth: '140px',
      maxWidth: '160px',
      selector: (row) => row.user?.email,
      sortable: true,
    },
    {
      name: "Nội dung",
      minWidth: '140px',
      maxWidth: '200px',
      selector: (row) => row.body,
      sortable: true,
    },
    {
      name: "Bình chọn",
      width: '130px',
      selector: (row) => row.vote + " sao",
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => { window.location.href = "/admin/feedback/" + row?.id }}
            style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
          >
            <CIcon icon={cilPen} />
          </button>
          <button
            onClick={() => submitDelete(row?.id)}
            style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
          >
            <CIcon icon={cilTrash} />
          </button>
        </div>
      ),
    },
  ];
  const history = useHistory();
  const [data, setDataTable] = useState([]);
  const [isModify, setIsModify] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const getAllFeedBack = async () => {
    try {
      const response = await adminApi.getAllFeedback(page, itemsPerPage);
      setDataTable(response.data);
      setTotalRows(response.totalItems)
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getAllFeedBack();
    // eslint-disable-next-line
  }, [isModify, itemsPerPage, page]);


  const submitDelete = (id) => {
    confirmAlert({
      title: 'Xác nhận thay đổi trạng thái',
      message: 'Bạn có chắc chắn điều này',
      buttons: [
        {
          label: 'Có',
          onClick: () => handleDelete(id)
        },
        {
          label: 'Không',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  const handleDelete = async (id) => {
    try {
      const response = await adminApi.deleteFeedback(id);
      setIsModify(!isModify);
      toast.success(response?.message, {
          duration: 2000,
      });
  } catch (responseError) {
      toast.error(responseError?.message, {
          duration: 2000,
      });
  }
  }


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
                      "/admin/feedback/create"
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
