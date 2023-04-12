import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../layout/footer/footer";
import Header from "../layout/header/header";
import { adminApi } from "../../../api/adminApi";
import bannerImg from "../../../images/banner/banner3.jpg";
import Paging from "../../Paging/Paging"
import { combieImg } from "../../../utils";
import ProductAside from "../element/course-aside";
import { useDispatch, useSelector } from "react-redux";
import { addPackageLocal } from "../../../redux/reducers/order";
import { toast } from "react-toastify";
import { userApi } from "../../../api/userApi";

function Products() {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loaction = useLocation();
  const [data, setDataTable] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getListProduct = async () => {
    try {
      const response = await adminApi.getAllPackageView({
        page: pageIndex - 1,
        size: 9,
        ...loaction.state,
      });
      setDataTable(response.data);
      setTotalPages(response.totalPages);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const handleAddToCart = (data) => {
    if (!isLogin) {
      dispatch(addPackageLocal(data));
      toast.success("Add To Cart Success !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      userApi.addToCard({ packageId: data.id }).then((res) => {
        console.log(res);
        toast.success("Add To Cart Success !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(addPackageLocal(data));
      });
    }
  };

  useEffect(() => {
    getListProduct();
    // eslint-disable-next-line
  }, [pageIndex, loaction.state]);

  useEffect(() => {
    setPageIndex(1)
  }, [loaction.state]);

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
              <h1 className="text-white">Danh sách khóa học</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Danh sách khóa học</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                  <ProductAside></ProductAside>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    {data?.length > 0 ? data.map((item) => (
                      <div
                        className="col-md-6 col-lg-4 col-sm-6 m-b30"
                        key={item.id}
                      >
                        <div className="cours-bx">
                          <div className="action-box">
                            <img
                              src={
                                item?.image != null && item?.image
                                  ? combieImg(item.image)
                                  : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                              }
                              alt=""
                              onError={({ currentTarget }) => {
                                currentTarget.src =
                                  "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                              }}
                            />
                            <div
                              onClick={() => {
                                window.location.href =
                                  "/courses-details/" + item.id;
                              }}
                              className="btn btn-warning m-2"
                            >
                              Xem thêm
                            </div>
                          </div>
                          <div className="info-bx">
                            <h5>
                              <div
                                onClick={() => {
                                  window.location.href =
                                    "/courses-details/" + item.id;
                                }}
                              >
                                {item.title}
                              </div>
                            </h5>
                            <div>
                              <i className="fa fa-user"></i>{" "}
                              {item?.sucjectCode?.expert?.user?.fullname}
                            </div>
                            <div>
                              <i className="fa fa-eye"></i> {item?.views}
                            </div>
                          </div>
                          <div className="cours-more-info">
                            <div className="price">
                              <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.listPrice)}</del>
                              <h5 className="fs-6">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice)}</h5>
                            </div>
                            <div className="review">
                              {/* <span> expert</span> */}
                              {/* <ul className="cours-star">
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul> */}
                              <div
                                className="btn btn-warning"
                                onClick={() => handleAddToCart(item)}
                              >
                                <i className="fa fa-cart-plus"></i> Thêm vào giỏ
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : <h6>Không có khóa học nào</h6>}
                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        {/* <ul className="pagination">
													<li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
													<li className="active"><Link to="#">1</Link></li>
													<li><Link to="#">2</Link></li>
													<li><Link to="#">3</Link></li>
													<li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
												</ul> */}
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
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;
