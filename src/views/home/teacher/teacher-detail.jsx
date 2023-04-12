import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Layout
import Header from "../layout/header/header";
import Footer from "../layout/footer/footer";

// Elements
import BlogAside from "../element/blog-aside";

// Images
import bannerImg from "../../../images/banner/banner2.jpg";
import { userApi } from "../../../api/userApi";
// import ReactHtmlParser from "react-html-parser";
import { combieImg } from "../../../utils/index";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Comments from "../../element/Comments";

function LecturerDetails(prop) {
  const [expert, setexpert] = useState({});
  const { isLogin } = useSelector((state) => state.auth);
  const [commets, setComments] = useState({ data: [] });

  const { id } = useParams();

  const getexpertById = async () => {
    const response = await userApi.getAllExpertId(id);
    setexpert(response);
  };

  useEffect(() => {
    getexpertById();
    userApi.getCommentExpert({ expertId: id }).then((x) => setComments(x));
    // eslint-disable-next-line
  }, []);

  const handleComment = (data) => {
    if (isLogin) {
      userApi
        .createComment({ ...data, expertId: id })
        .then((res) => {
          toast.success(res.message);
          userApi.getCommentExpert({ expertId: id }).then((x) => setComments(x));
        })
        .catch((e) => toast.error(e?.data?.message));
    }
  };

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
              <h1 className="text-white">{expert?.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Chi tiết giảng viên</li>
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
                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6">
                      <div className="action-box blog-lg">
                        <img
                          style={{ height: "100%" }}
                          src={combieImg(expert?.user?.avatar)}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6">
                      <h3 className="post-title">{expert?.jobTitle}</h3>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">Công ty hiện tại: </span>
                        <span>{expert?.company}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">Việc làm hiện tại: </span>
                        <span>{expert?.jobTitle}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">Họ và tên: </span>
                        <span>{expert?.user?.fullname}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">Số điện thoại: </span>
                        <span>{expert?.user?.phoneNumber}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">Email: </span>
                        <span>{expert?.user?.email}</span>
                      </div>
                      {/* <p>{ReactHtmlParser(expert?.description)}</p> */}
                    </div>
                  </div>
                  <Comments
                    hanleComment={handleComment}
                    comments={commets.data}
                  />
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

export default LecturerDetails;
