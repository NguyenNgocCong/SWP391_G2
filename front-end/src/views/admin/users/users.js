import React, { useEffect, useState, } from "react";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import { AiOutlineUser, AiOutlineDatabase } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import {
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";

const Users = () => {

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
      maxWidth: '180px',
      selector: (row) => row?.username,
      sortable: true,
    },
    {
      name: "Email",
      minWidth: '225px',
      maxWidth: '275px',
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Họ và tên",
      minWidth: '150px',
      maxWidth: '250px',
      selector: (row) => row?.fullname,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      left: true,
      minWidth: '80px',
      maxWidth: '160px',
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },
    {
      name: "Role",
      width: '130px',
      center: true,
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          {row?.role?.replace("ROLE_", "") === "ADMIN"
            ? <AiOutlineDatabase color="#EA5455" />
            : (row?.role?.replace("ROLE_", "") === "GUEST"
              ? <AiOutlineUser color="#7367F0" />
              : <FaDatabase color="#28C76F" />)
          }
          <div style={{ marginLeft: "5px" }}>
            {" "}
            {row?.role?.replace("ROLE_", "")}
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Trạng thái",
      width: '150px',
      center: true,
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          <div className={`${row?.active ? Styles.active : Styles.inactive}`}>
            <strong>{row?.active ? "Hoạt động" : "Không hoạt động"}</strong>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      width: '250px',
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => { window.location.href = "/admin/users/" + row?.id }}
            style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
          >
            <CIcon icon={cilPen} />
          </button>
          <button
            style={{ backgroundColor: "#7367f0", height: "30px", width: "120px", border: "none", float: 'right' }}
            onClick={() => submit(row)}
          >
            {row?.active ?  "Tắt hoạt động" : "Bật hoạt động"}
          </button>
        </div>
      ),
    },
  ];
  const [listRole, setListRole] = useState([]);
  const [data, setDataTable] = useState([]);
  const [isModify, setIsModify] = useState(false);
  const [role, setRole] = useState(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const getListUser = async () => {
    try {
      const response = await adminApi.getListUser(page, itemsPerPage, name, status, role);
      setDataTable(response.data);
      setTotalRows(response.totalItems)
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const getListRole = async () => {
    try {
      const response = await adminApi.getListRole();
      setListRole(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const handleUpdateActiveUser = async (row) => {
    try {
      const params = {
        username: row?.username,
        status: row?.active,
      };
      const response = await adminApi.updateActiveUser(params);
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

  const submit = (row) => {

    confirmAlert({
      title: 'Xác nhận thay đổi trạng thái',
      message: 'Bạn có chắc chắn về vấn đề này',
      buttons: [
        {
          label: 'Có',
          onClick: () => handleUpdateActiveUser(row)
        },
        {
          label: 'Không',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  const onSearch = async (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    getListUser();
    // eslint-disable-next-line
  }, [isModify, name, status, role, itemsPerPage, page]);

  useEffect(() => {
    getListRole();
  }, [])

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
          <div style={{ backgroundColor: "white", margin: "0px 0px 15px 0px", padding: "5px 0px" }} >
            <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
              <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                <CFormSelect
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value={0}>Tất cả</option>
                  {listRole.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item?.setting_id}
                      >
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

export default Users;
