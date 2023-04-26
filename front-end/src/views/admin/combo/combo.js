import React, { useEffect, useState, } from "react";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { adminApi } from "../../../api/adminApi";
import { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import {
    CFormInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilCircle, cilLibraryAdd } from "@coreui/icons";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";

const packageTemplate = (props) => {
    return (props?.comboPackages.map((element, index) => (
        <div key={index} style={{ margin: "2px" }} className="d-flex align-items-center">
            <div className={`${Styles.element}`}>
                <CIcon icon={cilCircle} height="7px" /> Tiều đề: {element?._package?.title}, Giá bán: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(element?.salePrice)}
            </div>
        </div>
    )))
}

const priceTemplate = (props) => {
    let price = 0
    props?.comboPackages.map((element) => (
        price += element?.salePrice
    ))
    return (<div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</div>)
}
const Combo = () => {

    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Tiêu đề",
            minWidth: '200px',
            maxWidth: '250px',
            selector: (row) => row?.title,
            sortable: true,
        },
        {
            name: "Khóa học",
            left: true,
            maxWidth: '400px',
            maxWidth: '600px',
            selector: (row) => packageTemplate(row),
            sortable: true,
        },
        {
            name: "Giá bán",
            width: '100px',
            selector: (row) => priceTemplate(row),
            sortable: true,
        },
        {
            name: "Cập nhật gần nhất",
            width: '150px',
            selector: (row) => row?.updatedDate,
            format: (row) => moment(row.lastLogin).format('hh:MM DD/mm/yyyy'),
            sortable: true,
        },
        {
            name: "Hành động",
            center: true,
            width: '110px',
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => { window.location.href = "/admin/combos/" + row?.id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
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
    const history = useHistory();

    const getListCombo = async () => {
        try {
            const response = await adminApi.getAllCombo(page, itemsPerPage, keyword);
            setDataTable(response.data);
            setTotalRows(response.totalItems)
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const onSearch = async (e) => {
        setKeyword(e.target.value);
    };
    useEffect(() => {
        getListCombo();
        // eslint-disable-next-line
    }, [itemsPerPage, page, keyword]);

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
                    <div style={{ backgroundColor: "white", padding: "5px 0px", margin: "0px 0px 15px 0px" }} >
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col xs={12} lg={4} style={{ padding: "5px 10px" }}>
                                <CFormInput
                                    type="text"
                                    id="exampleInputPassword1"
                                    placeholder="Tìm kiếm..."
                                    onChange={onSearch}
                                />
                            </Col>
                            <Col xs={12} lg={8} className='d-flex justify-content-end' style={{ padding: "5px 10px" }}>
                                <div className={Styles.inputSearch}>
                                    <button
                                        style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                                        onClick={() =>
                                            history.push(
                                                "/admin/combos/create"
                                            )
                                        }
                                    >
                                        <CIcon icon={cilLibraryAdd} />
                                    </button>
                                </div></Col>
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

export default Combo;
