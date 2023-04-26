import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CRow,
  CCol,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
} from "@coreui/react";
import Header from "../layout/header/header";
import Footer from "../layout/footer/footer";
import BlogAside from "../element/blog-aside";
import bannerImg from "../../../images/banner/banner1.jpg";
import { userApi } from "../../../api/userApi";
import { useSelector } from "react-redux";
import Paging from "../../Paging/Paging";
import { combieImg } from "../../../utils";

const Lecturers = () => {
  const [listPost, setListPost] = useState([]);
  const searchLecturers = useSelector((state) => state.blogReducers.search);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getListPost = async () => {
    try {
      const response = await userApi.getAllExpert({ page: pageIndex });
      setListPost(
        response.data.filter((res) =>
          res.user?.fullname
            .toLowerCase()
            .includes(searchLecturers.toLowerCase())
        )
      );
      setTotalPages(response.totalPages);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getListPost();
    // eslint-disable-next-line
  }, [searchLecturers]);

  return (
    <>
      <Header />
      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ height: "200px", backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Giảng viên</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Danh sách giảng viên</li>
            </ul>
          </div>
        </div>
        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-xl-3 col-md-5 ">
                  <BlogAside />
                </div>
                <div className="col-lg-9 col-xl-9 col-md-7">
                  <CRow className="g-0">
                    {listPost.length > 0 ? listPost.map((item) => (
                      <CRow key={item?.id}>
                        <CCol md={3}>
                          <CCardImage
                            src={
                              item?.user?.avatar != null && item?.user?.avatar
                                ? combieImg(item?.user?.avatar)
                                : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                            }
                            alt=""
                            onError={({ currentTarget }) => {
                              currentTarget.src =
                                "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                            }}
                          />
                        </CCol>
                        <CCol md={9}>
                          <CCardTitle>
                            <Link to={`/blog/${item?.id}`}>
                              {item?.user?.fullname}
                            </Link>
                          </CCardTitle>
                          <CCardText>{item?.jobTitle}</CCardText>
                          <CButton>
                            <Link to={`/lecturers/${item?.id}`}>Đọc thêm</Link>
                          </CButton>
                        </CCol>
                        <hr />
                      </CRow>
                    )) : <h6>Không có giảng viên nào</h6>}
                  </CRow>
                  <div className="pagination-bx rounded-sm gray m-b30 clearfix">
                    <Paging
                      totalPage={totalPages}
                      pageIndex={pageIndex}
                      onChange={(e) => {
                        setPageIndex(e);
                      }}
                    ></Paging>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Lecturers;
