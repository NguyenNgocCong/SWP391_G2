import React, { useEffect, useState, } from "react";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import {
    CFormInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";

const Experts = () => {

    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Họ và tên",
            minWidth: '150px',
            maxWidth: '180px',
            selector: (row) => row?.user?.fullname,
            sortable: true,
        },
        {
            name: "Email",
            minWidth: '175px',
            maxWidth: '225px',
            selector: (row) => row?.user?.email,
            sortable: true,
        },
        {
            name: "Công ty",
            minWidth: '175px',
            maxWidth: '225px',
            selector: (row) => row?.company,
            sortable: true,
        },
        {
            name: "Công việc",
            left: true,
            minWidth: '150px',
            maxWidth: '250px',
            selector: (row) => row?.jobTitle,
            sortable: true,
        },
        {
            name: "Trạng thái",
            width: '150px',
            center: true,
            selector: (row) => (
                <div className="d-flex align-items-center justify-content-center">
                    <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
                        <strong>{row?.status ? "Công khai" : "Không công khai"}</strong>
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
                        onClick={() => { window.location.href = "/admin/experts/" + row?.id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
                    </button>
                    <button
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "120px", border: "none", float: 'right' }}
                        onClick={() => submit(row)}
                    >
                        {row?.status ? "Tắt công khai" : "Bật công khai"}
                    </button>
                </div>

            ),
        },
    ];
    const [data, setDataTable] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isModify, setIsModify] = useState(false);

    const getListExperts = async () => {
        try {
            const response = await adminApi.getListExperts(page, itemsPerPage, keyword);
            setDataTable(response.data);
            setTotalRows(response.totalItems)
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const handleUpdateStatus = async (row) => {
        let id = row.id;
        let status = row.status;
        let statusChange = -1;
        if (Number(status) === 0) {
            statusChange = 1;
        } else {
            statusChange = 0;
        }
        try {
            const params = {
                status: statusChange,
            };

            const response = await adminApi.updateExpert(id, params, null);
            setIsModify(!isModify);
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    }

    const submit = (row, type) => {

        confirmAlert({
            title: 'Xác nhận thay đổi trạng thái',
            message: 'Bạn có chắc về điều này',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => handleUpdateStatus(row, type)
                },
                {
                    label: 'Không',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    }

    const onSearch = async (e) => {
        setKeyword(e.target.value);
    };
    useEffect(() => {
        getListExperts();
        // eslint-disable-next-line
    }, [itemsPerPage, page, isModify, keyword]);

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
                    <div style={{ backgroundColor: "white",  padding: "5px 0px", margin: "0px 0px 15px 0px" }} >
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col xs={12} lg={4}  style={{ padding: "5px 10px" }}>
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

export default Experts;
