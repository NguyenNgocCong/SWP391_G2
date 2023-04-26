import React, { useEffect, useState } from "react";
import {
    CFormSelect,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import Styles from "./style.module.scss";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import CIcon from '@coreui/icons-react';
import { cilLibraryAdd, cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";
import { combieImg } from "../../../utils";

const Sliders = () => {
    const [data, setDataTable] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const history = useHistory();
    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Ảnh",
            width: '250px',
            selector: (row) => (
                <img
                    src={(row?.imageUrl != null && row?.imageUrl) ? combieImg(row?.imageUrl) : ""}
                    style={{ height: "70px", width: "100%" }}
                    alt='thumbnail'
                />
            ),
            sortable: false,
        },
        {
            name: "Tiêu đề",
            maxWidth: '260px',
            selector: (row) => row?.title,
            sortable: true,
        },
        {
            name: "Đường dẫn",
            maxWidth: '260px',
            selector: (row) => row?.url,
            sortable: true,
        },
        {
            name: "Hạn bài đăng",
            maxWidth: '160px',
            selector: (row) => new Date(row?.validTo).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Trạng thái",
            maxWidth: '200px',
            selector: (row) => (
                <>
                    <div className={` ${row?.status !== 2 ? Styles.active : Styles.inactive}`} style={{ textAlign: 'center', width: '100px' }}>
                        {(() => {
                            if (row?.status === 0) {
                                return (<>Nháp</>)
                            } else if (row?.status === 1) {
                                return (<>Được phát hành</>)
                            } else if (row?.status === 2) {
                                return (<>Hoàn thành</>)
                            }
                        })()}
                    </div>
                    <br />
                    <div>{row?.createDate}</div>
                </>
            ),
            sortable: true,
        },
        {
            name: "Hành động",
            maxWidth: '200px',
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => { window.location.href = "/admin/sliders/" + row?.id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
                    </button>
                    <button
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "80px", border: "none", float: 'right' }}
                        onClick={() => submit(row)}
                    >
                        {(() => {
                            if (row?.status === 1) {
                                return ("Hoàn thành")
                            } else if (row?.status === 2 || row?.status === 0) {
                                return ("Phát hành")
                            }
                        })()}
                    </button>
                </div>
            ),
        },
    ];

    const handleUpdateStatus = async (row) => {
        let id = row.id;
        let status = row.status;
        let statusChange = -1;
        if (status === 0) {
            statusChange = 1;
        } else if (status === 1) {
            statusChange = 2;
        } else if (status === 2) {
            statusChange = 1;
        }
        try {
            const params = {
                status: statusChange,
            };

            const response = await adminApi.updateSlider(id, null, params);
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

    const submit = (row) => {

        confirmAlert({
            title: 'Xác nhận thay đổi trạng thái',
            message: 'Bạn có chắc chắn về điều này',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => handleUpdateStatus(row)
                },
                {
                    label: 'Không',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    }

    const getListSlider = async () => {
        try {
            const response = await adminApi.getAllSlider(page, itemsPerPage, status);
            setDataTable(response.data);
            setTotalRows(response.totalItems);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getListSlider();
        // eslint-disable-next-line
    }, [isModify, status, page, itemsPerPage]);

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
                            <Col xs={12} lg={6} className={Styles.showEntry}>
                                <CFormSelect
                                    aria-label="Default select example"
                                    style={{ margin: "0px 10px", width: "180px" }}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }}
                                >
                                    <option value="">Tất cả </option>
                                    <option value="0">Nháp</option>
                                    <option value="1">Được phát hành</option>
                                    <option value="2">Hoàn thành</option>
                                </CFormSelect>
                            </Col>
                            <Col xs={12} lg={6} className='d-flex justify-content-end' style={{ padding: "5px 10px" }}>
                                <div className={Styles.inputSearch}>
                                    <button
                                        style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                                        onClick={() =>
                                            history.push(
                                                "/admin/posts/create"
                                            )
                                        }
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

export default Sliders;
