import React from "react";
// import {
//     CCard,
//     CCardBody,
//     CCol,
//     CRow,
// } from "@coreui/react";
import { dashboardApi } from "../../../api/dashboardApi";
import { CChart, CChartBar, CChartDoughnut } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import WidgetsDropdown from "../widgets/widgets-dropdown";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { useEffect, useState } from "react";
import palette from "./palette";
import { toast } from "react-hot-toast";

const Dashboard = () => {
    const [dataDoughnut, setDataDoughnut] = useState();
    const [dataOrder, setDataOrder] = useState();
    const [dataChartBar, setDataChartBar] = useState();
    const [category, setCategory] = useState(1);

    const getDataDashboard = async () => {
        try {
            const response = await dashboardApi.getDataDoughnut();
            setDataDoughnut(response)
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
        try {
            const response = await dashboardApi.getDataBar(category);
            setDataChartBar(response)
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
        try {
            const response = await dashboardApi.getOrders();
            setDataOrder(response);
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };
    useEffect(() => {
        getDataDashboard();
        // eslint-disable-next-line
    }, []);


    const data = {
        datasets: [
            {
                data: [dataOrder?.total_class_month, dataOrder?.total_package_month, dataOrder?.total_combo_month],
                backgroundColor: [
                    palette.error.main,
                    palette.success.main,
                    palette.warning.main
                ],
                borderWidth: 8,
                borderColor: palette.white,
                hoverBorderColor: palette.white
            }
        ],
        labels: ['Lớp học', 'Khóa học', 'Combo']
    };

    const data2 = {
        datasets: [
            {
                data: [dataDoughnut?.total_submit, dataDoughnut?.total_verfi, dataDoughnut?.total_done, dataDoughnut?.total_cancel],
                backgroundColor: [
                    palette.secondary.main,
                    palette.error.main,
                    palette.success.main,
                    palette.warning.main
                ],
                borderWidth: 8,
                borderColor: palette.white,
                hoverBorderColor: palette.white
            }
        ],
        labels: ['Đăng ký', 'Xác nhận', 'Thanh toán', 'Hủy']
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                rtl: true,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 35,
                }
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            borderWidth: 2,
            borderColor: palette.divider,
            backgroundColor: palette.white,
            titleFontColor: palette.text.primary,
            bodyFontColor: palette.text.secondary,
            footerFontColor: palette.text.secondary
        }
    };

    const dataBar = {
        labels: dataChartBar?.list_label,
        datasets: [
            {
                label: 'Doanh số',
                backgroundColor: palette.neutral,
                data: dataChartBar?.list_sales
            },
            {
                label: 'Doanh thu',
                backgroundColor: palette.secondary.main,
                data: dataChartBar?.list_revenue
            }

        ]
    };

    const optionsBar = {
        plugins: {
            legend: {
                position: 'bottom',
                rtl: true,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 35,
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        legend: { display: false },
        cornerRadius: 12,
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            borderWidth: 1,
            borderColor: palette.divider,
            backgroundColor: palette.white,
            titleFontColor: palette.text.primary,
            bodyFontColor: palette.text.secondary,
            footerFontColor: palette.text.secondary
        },
        layout: { padding: 0 },
        scales: {
            xAxes: [
                {
                    barThickness: 2,
                    maxBarThickness: 5,
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                    ticks: {
                        fontColor: palette.text.secondary
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: palette.text.secondary,
                        beginAtZero: true,
                        min: 0
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                        zeroLineColor: palette.divider
                    }
                }
            ]
        }
    };

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    {/* <CRow>
                        <CCol xs={12} sm={6} lg={9}>
                            <WidgetsDropdown />
                        </CCol>
                        <CCol xs={12} sm={4} lg={3}>
                            <CCard>
                                <CCardBody
                                >
                                    <CChartDoughnut
                                        style={{ height: "261px", marginTop: "20px" }}
                                        data={data}
                                        options={options}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm={9}>
                            <CCard className="mb-4">
                                <CCardBody>
                                    <CRow>
                                        <CCol sm={5}>
                                            <h4
                                                id="traffic"
                                                className="card-title mb-0"
                                            >
                                                Doanh thu
                                            </h4>
                                        </CCol>
                                        <CChartBar
                                            style={{ height: "300px", marginTop: "20px" }}
                                            data={dataBar}
                                            options={optionsBar}
                                        />
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm={3}>
                            <CCard>
                                <CCardBody>
                                    <CChartDoughnut
                                        style={{ height: "330px", marginTop: "20px" }}
                                        data={data2}
                                        options={options}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow > */}
                </div >
                <AppFooter />
            </div >
        </>
    );
};

export default Dashboard;
