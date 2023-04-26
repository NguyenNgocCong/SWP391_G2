import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Layout
import Footer from "../layout/footer/footer";
import Header from "../layout/header/header";
import { Markup } from "interweave";
import { classApi } from "../../../api/classApi";
import bannerImg from "../../../images/banner/banner2.jpg";
import { combieImg } from "../../../utils/index";
import Comments from "../../element/Comments";
import { useSelector } from "react-redux";
import { userApi } from "../../../api/userApi";
import { toast } from "react-toastify";

function ClassUserDetails(props) {
  const params = useParams();
  const { isLogin } = useSelector((state) => state.auth);
  const [commets, setComments] = useState({ data: [] });

  const [res, setRes] = useState(classDetailEx);

  const { id } = params;

  useEffect(() => {
    classApi.getClassById(id).then((res) => {
      setRes(res);
    });
    userApi.getCommentClass({ classId: id }).then((x) => setComments(x));
  }, [id]);

  const handleComment = (data) => {
    if (isLogin) {
      userApi
        .createComment({ ...data, classId: id })
        .then((res) => {
          toast.success(res.message);

          userApi.getCommentClass({ classId: id }).then((x) => setComments(x));
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
              <h1 className="text-white">{res.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{res.title}</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row d-flex flex-row-reverse">
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 m-b30">
                  <div className="course-detail-bx">
                    <img
                      src={combieImg(res.packages?.image)}
                      alt={res.packages?.title}
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                    <div className="course-price">
                      <del>{res.packages.listPrice}</del>
                      <h4 className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(res.packages.salePrice)}</h4>
                    </div>
                    <div className="text-center">
                      <i className="fa fa-calendar"></i>{" "}
                      {res?.schedule}&emsp;
                      <i className="fa fa-clock-o"></i>{" "}
                      {res?.time}
                    </div>
                    <div className="text-center">
                      <i className="fa fa-calculator"></i>{" "}
                      {new Date(res?.dateFrom).toLocaleDateString()} -{" "}
                      {new Date(res?.dateTo).toLocaleDateString()}
                    </div>
                    <div className="course-price">
                      <i className="fa fa-location-arrow"></i>{" "}
                      {res?.branch?.setting_title
                        ? res?.branch?.setting_title
                        : "Online"}
                    </div>
                    <div className="course-buy-now text-center">
                      <Link to="#" className="btn radius-xl btn-primary">
                        {" "}
                        Liên hệ{" "}
                      </Link>
                    </div>
                    <div className="teacher-bx">
                      <div className="teacher-info">
                        <div className="teacher-thumb">
                          <img
                            src={combieImg(res.trainer?.user?.avatar)}
                            alt=""
                          />
                        </div>
                        <div className="teacher-name">
                          <h5>{res.trainer?.user?.fullname}</h5>
                          <span>{res.trainer?.company}</span>
                        </div>
                      </div>
                    </div>
                    <div className="cours-more-info">
                      <div className="review">
                        <span>3 Review</span>
                        <ul className="cours-star">
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                  <div className="courses-post">
                    <div className="ttr-post-info m-b30">
                      <div className="ttr-post-title ">
                        <h2 className="post-title">{res.packages?.title}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <Markup content={res.packages?.excerpt} />
                      </div>
                      <div className="ttr-post-text">
                        <Markup content={res.packages?.description} />
                      </div>
                      <div className="review-bx">
                        <div className="ttr-post-text">
                          <h5>
                            Trainer informaiton: {res.trainer?.user?.fullname}
                          </h5>
                          <Markup content={res.trainer?.description} />
                        </div>
                      </div>
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

const classDetailEx = {
  startDate: "2022-11-12T00:00:00.000+00:00",
  supporter: {
    id: 21,
    username: "Supporter",
    email: "Supporter@gmail.com",
    fullname: "Supporter",
    phoneNumber: "",
    avatar: "24659c6a-2ab5-4e7c-ad7b-e8f99733ac44.jpg",
    role: "ROLE_SUPPORTER",
    active: true,
  },
  id: 3,
  code: "IS202211214382",
  dateFrom: "2022-11-21T00:00:00.000+00:00",
  dateTo: "2022-12-04T00:00:00.000+00:00",
  status: true,
  packages: {
    id: 5,
    title: "Khóa học .net căn bản ",
    excerpt:
      "khóa học này được quản lý bởi 1 chuyên gia về .net core có hơn10 năm kinh nghiệm code .netcore",
    duration: "140",
    description: "",
    status: true,
    listPrice: 150.0,
    salePrice: 110.0,
    sucjectCode: {
      id: 2,
      code: ".Net/C#0001",
      name: ".Net/C#",
      status: true,
      note: "học lập trình api .net core",
      manager: {
        id: 3,
        username: "NgVinh",
        email: "manage1@gmail.com",
        fullname: "Nguyễn Văn Vinh",
        phoneNumber: "0358283749",
        avatar: null,
        role: "ROLE_MANAGER",
        active: true,
      },
      expert: {
        id: 7,
        username: "Thanhlt",
        email: "expert1@gmail.com",
        fullname: "Lê Tiến Thành",
        phoneNumber: "098673456",
        avatar: "9c8c4dcd-d72b-4329-8389-2d1dc1d86394.jpg",
        role: "ROLE_EXPERT",
        active: true,
      },
      image: null,
      categoryId: 12,
    },
  },
  trainer: {
    id: 3,
    createdDate: "2022-11-18 20:51:38.262",
    updatedDate: "2022-11-18 20:51:38.263",
    company: "FPT software",
    jobTitle: ".NET Project Techlead - Project Manager",
    status: true,
    description: "",
    user: {
      id: 8,
      createdDate: "2022-10-25 11:07:01.252",
      updatedDate: "2022-11-19 13:38:22.102",
      email: "expert2@gmail.com",
      username: "Toanbn",
      password: "$2a$10$5hB.S1F2mmY1a19omdGGiebwWXanOJXfLceeL6OlyHSEwg2znEaU2",
      fullname: "Bạch Ngọc Toàn",
      phoneNumber: "09836342323",
      avatar: "1131cab7-2257-4bb5-a07b-d1e78a88316a.jpg",
      note: null,
      active: true,
      registerToken: "teNmBZM4k1lhaengvFGKFX6oVRvUkI",
      timeRegisterToken: "2022-10-25T11:07:01",
      resetPasswordToken: null,
      type_account: null,
      role: {
        setting_id: 8,
        type: {
          type_id: 1,
          title: "User Role",
        },
        setting_title: "Expert",
        setting_value: "ROLE_EXPERT",
        display_order: "role of expert",
        status: true,
        desciption: "role of expert",
      },
    },
  },
};

export default ClassUserDetails;
