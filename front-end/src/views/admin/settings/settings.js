import React, { useEffect, useState } from "react";
import {
    CFormInput,
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
import { Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";

const Settings = () => {
    const [data, setData] = useState([]);
    const [listType, setListType] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [status, setStatus] = useState("");
    const [typeId, setTypeId] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [totalRows, setTotalRows] = useState(0);
    const [isModify, setIsModify] = useState(false);
    const history = useHistory();

    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Tiêu đề",
            selector: (row) => row?.setting_title,
            sortable: true,
        },
        {
            name: "Tên",
            selector: (row) => row?.display_order,
            sortable: true,
        },
        {
            name: "Giá trị",
            selector: (row) => row?.setting_value,
            sortable: true,
        },
        {
            name: "Mô tả",
            selector: (row) => row?.desciption,
            sortable: true,
        },
        {
            name: "Trạng thái",
            maxWidth: '160px',
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
            width: '250px',
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => { window.location.href = "/admin/settings/" + row?.setting_id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
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

    const submit = (row) => {

        confirmAlert({
            title: 'Xác nhận thay đổi trạng thái',
            message: 'Bạn có chắc chắn về vấn đề này',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => handleUpdateActive(row)
                },
                {
                    label: 'Không',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    }

    const handleUpdateActive = async (row) => {
        try {
            const params = {
                status: row?.active,
            };
            const response = await adminApi.updateSetting(params);
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

    const getListSetting = async () => {
        try {
            const response = await adminApi.getAllSetting(page, itemsPerPage, typeId, keyword, status ? status : "");
            setData(response.data);
            setTotalRows(response.totalItems)
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const onSearch = (e) => {
        setKeyword(e.target.value);
    }

    const getAllType = async () => {
        try {
            const response = await adminApi.getListType();
            setListType(response);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getListSetting();
        // eslint-disable-next-line
    }, [typeId, keyword, status, page, itemsPerPage, isModify]);

    useEffect(() => {
        getAllType();
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
                    <div style={{ backgroundColor: "white", padding: "5px 0px", margin: "0px 0px 15px 0px" }}>
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                                <CFormSelect
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setTypeId(e.target.value);
                                    }}
                                >
                                    <option value={0}>Tất cả</option>
                                    {listType.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item?.type_id}
                                            >
                                                {item?.title}
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
                                        style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                                        onClick={() =>
                                            history.push(
                                                "/admin/settings/create"
                                            )
                                        }
                                    >
                                        <CIcon icon={cilLibraryAdd} />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
                <div className="body flex-grow-1 px-3">
                    <DataTable
                        columns={columns}
                        data={data}
                        paginationTotalRows={totalRows}
                        onChangePage={(page) => setPage(page - 1)}
                        itemsPerPage={itemsPerPage}
                        onChangeRowsPerPage={handlePerRowsChange}
                        pagination
                        paginationServer></DataTable>
                </div>

                <AppFooter />
            </div>
        </div >
    );
};

export default Settings;
