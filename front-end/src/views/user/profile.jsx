import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";

// Layout
import Header from "../home/layout/header/header";
import MyCart from "./element/my-cart";
import EditProfile from "./element/edit-profile";
import ChangePassword from "./element/change-password";
import bannerImg from "../../images/banner/banner1.jpg";
import avatarProfile from "../../images/icon/avatar.svg";
import { userApi } from "../../api/userApi";
import { combieImg } from "../../utils";
import MyOrderProfile from "./element/my-order-profile";
import MyOrderCancel from "./element/my-order-cancel";
import MyOrderProcess from "./element/my-order-process";
import MyClass from "./element/my-class";
import MyCourses from "./element/my-courses";
import { useSelector } from "react-redux";

function Profile(props) {
  const { isLogin } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [state, setState] = useState(false);
  const [active, setActive] = useState(1);
  const [subActive, setSubActive] = useState(1);
  const location = useLocation();
  const tabIndex = location.pathname.substring(
    "/profile/".length,
    location.pathname.length
  );
  const getUsetProfile = async () => {
    try {
      const response = await userApi.getUserDetail();
      setUser(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getUsetProfile();
  }, [state]);
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
              <h1 className="text-white">Hồ sơ cá nhân</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Hồ sơ cá nhân</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp1">
            <div >
              <Tab.Container defaultActiveKey={tabIndex ? tabIndex : "1"}>
                <Tab.Content>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12 m-b30">
                      <div className="profile-bx text-center">
                        {isLogin ? (
                          <>
                            <div className="user-profile-thumb ">
                              <img
                                src={
                                  user?.avatar != null && user?.avatar
                                    ? combieImg(user?.avatar)
                                    : avatarProfile
                                }
                                className="w-100 h-100"
                                alt=""
                              />
                            </div>
                            <div className="profile-info">
                              <h4>{user?.fullname}</h4>
                              <span>{user?.email}</span>
                            </div>
                          </>
                        ) : (
                          <Link to={"/login"} className="btn btn-warning m-5 ">
                            Đăng nhập
                          </Link>
                        )}
                        {/* <div className="profile-social">
                          <ul className="list-inline m-a0">
                            <li>
                              <Link to="#">
                                <i className="fa fa-facebook"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fa fa-twitter"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fa fa-linkedin"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fa fa-google-plus"></i>
                              </Link>
                            </li>
                          </ul>
                        </div> */}
                        <div className="profile-tabnav">
                          <Nav className="nav-tabs">
                            <Nav.Item>
                              <Nav.Link eventKey="1">
                                <i className="fa fa-shopping-cart"></i>
                                Giỏ hàng
                              </Nav.Link>
                            </Nav.Item>
                            {isLogin && (
                              <>
                                <Nav.Item>
                                  <Nav.Link eventKey="2">
                                    <i className="fa fa-shopping-bag"></i>
                                    Đơn hàng
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="3" onClick={() => setActive(3)}>
                                    <i className="fa fa-users"></i>
                                    Lớp học
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="4" onClick={() => setActive(4)}>
                                    <i className="ti-book"></i>
                                    Khóa học
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="5" onClick={() => setActive(5)}>
                                    <i className="ti-pencil-alt"></i>
                                    Chỉnh sửa thông tin liên hệ
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="6" onClick={() => setActive(6)}>
                                    <i className="ti-lock"></i>
                                    Thay đổi mật khẩu
                                  </Nav.Link>
                                </Nav.Item>
                              </>
                            )}
                          </Nav>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12 m-b30">
                      <div className="profile-content-bx">
                        <div className="tab-content">
                          <Tab.Pane eventKey="1">
                            <MyCart />
                          </Tab.Pane>
                          <Tab.Pane eventKey="2">
                            <Tab.Container defaultActiveKey={subActive}>
                              <Tab.Content>
                                <div className="row">
                                  <div className="profile-tabnav-sub">
                                    <Nav className="nav-tabs">
                                      <Nav.Item>
                                        <Nav.Link eventKey="1" onClick={() => setSubActive(1)}>
                                          Đơn hàng chờ xử lý
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="2" onClick={() => setSubActive(2)}>
                                          Đơn hàng đã thanh toán
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="3" onClick={() => setSubActive(3)}>
                                          Đơn hàng đã hủy
                                        </Nav.Link>
                                      </Nav.Item>
                                    </Nav>
                                  </div>
                                  <div className="tab-content">
                                    <Tab.Pane eventKey="1">
                                      <MyOrderProcess activeTab={subActive} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="2">
                                      <MyOrderProfile activeTab={subActive} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="3">
                                      <MyOrderCancel activeTab={subActive} />
                                    </Tab.Pane>
                                  </div>
                                </div>
                              </Tab.Content>
                            </Tab.Container>
                          </Tab.Pane>
                          <Tab.Pane eventKey="3">
                            <MyClass activeTab={active} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="4">
                            <MyCourses activeTab={active} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="5">
                            <EditProfile
                              user={user}
                              stateChanger={setState}
                              state={state}
                              activeTab={active}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="6">
                            <ChangePassword activeTab={active} />
                          </Tab.Pane>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
