import { CFormInput } from "@coreui/react";
import Styles from "../style.module.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { adminApi } from "../../../../api/adminApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Row, Col } from "react-bootstrap";

const OrderDone = (props) => {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Tên tài khoản",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.user ? row.user?.username : row.customer?.fullName,
      sortable: true,
    },
    {
      name: "Mã đơn hàng",
      width: "150px",
      center: true,
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Số lượng",
      width: "150px",
      center: true,
      selector: (row) => row.orderPackages?.length > 0 ? row.orderPackages?.length + " sản phẩm" : 1 + " sản phẩm",
      sortable: true,
    },
    {
      name: "Người hỗ trợ",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.supporter?.username,
      sortable: true,
    },
    {
      name: "Tổng tiền",
      width: "120px",
      center: "true",
      selector: (row) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.totalCost),
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => {
              window.location.href = row.aclass ? "/admin/registration-detail/" + row?.id : "/admin/orders-detail/" + row?.id;
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
            <i className="fa fa-eye"></i>
          </button>
          <button
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "80px",
              border: "none",
              float: "right",
            }}
            onClick={() => submit(row)}
          >
            Hủy
          </button>
        </div>
      ),
    },
  ];
  const [data, setDataTable] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const getAllOrderDone = async () => {
    try {
      const response = await adminApi.getAllOrderDone(page, itemsPerPage, keywordSearch);
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
      title: "Xác nhận thay đổi trạng thái",
      message: "Bạn có chắc về điều này",
      buttons: [
        {
          label: "Có",
          onClick: () => handleUpdateActiveOrderDone(row),
        },
        {
          label: "Không",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const handleUpdateActiveOrderDone = async (row) => {
    try {
      const response = await adminApi.updateOrder(3, row?.id);
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
      // const response = await adminApi.getListCategoryOrderDone();
      // setListCategory(response);
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
    if(props.activeTab === 3)
    getAllOrderDone();
    // eslint-disable-next-line
  }, [isModify, keywordSearch, page, props.activeTab]);

  useEffect(() => {
    getListCategory();
  }, []);

  const handlePerRowsChange = async (newPerPage) => {
    setItemsPerPage(newPerPage);
  }

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
  );
}

export default OrderDone;
