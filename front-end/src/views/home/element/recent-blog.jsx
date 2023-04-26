import React, { useState } from "react";
import { useEffect } from "react";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils";

const FeatureContent3 = () => {
  const [listPost, setListPost] = useState([]);
  const [count, setCount] = useState();
  const getListPost = async () => {
    try {
      const response = await userApi.getAllPost({
        page: 0,
        size:1000,
      });
      setCount(response.data.length)
    } catch (responseError) {
      console.log(responseError);
    }
  };
  const getListRecentPost = async () => {
    try {
      const response = await userApi.getListRecentPost(4);
      setListPost(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getListRecentPost();
    getListPost();
  }, []);
  return (
    <>
      <div className="section-area bg-fix ovbl-dark join-bx section-sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="heading-bx left text-white" style={{ marginBottom: "5px" }}>
                <h2 className="title-head">
                  Blogs <span>Mới nhất </span>
                </h2>
              </div>
            </div>
            <div className="col-lg-2">
              <h2 className="title-head text-white">
                <span>{count}+ Blogs</span>
              </h2>
            </div>
            <div className="col-lg-12">
              <div className="row">
                {listPost.map((item) => (
                  <div key={item.id} className="col-lg-3" style={{ padding: "10px" }} title={item?.brefInfo}>
                    <div className="row" key={item?.id} style={{ boxShadow: "0px 5px 20px rgb(0 0 0 / 10%)", marginLeft: "10px", backgroundColor: "#FFFFFF", borderRadius: "5px" }}>
                      <div className="col-lg-4" style={{ marginTop: "10px", textAlign: "center" }}>
                        <img
                          style={{ height: "80px", width: "100%", borderRadius: "3px" }}
                          src={combieImg(item?.thumnailUrl)}
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.src =
                              "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                          }}
                        />
                        <div
                          onClick={() => {
                            window.location.href = "/blog/" + item?.id;
                          }}
                          className="btn btn-warning"
                          style={{ marginTop: "5px" }}
                        >
                          Đọc
                        </div>
                      </div>
                      <div className="col-lg-8 blog-home" style={{ padding: "10px" }}>
                        <h5
                          onClick={() => {
                            window.location.href = "/blog/" + item?.id;
                          }}
                        >
                          {item?.title}
                        </h5>
                        <ul className="media-post">
                          <li>
                            <i className="fa fa-user"></i> Bởi{" "}
                            {item?.author.fullname}
                          </li>
                          <li>
                            <i className="fa fa-calendar"></i>
                            {" " +
                              new Date(item?.createDate).toLocaleDateString()}
                          </li>
                          <li>
                            <i className="fa fa-eye"></i> {item?.views}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureContent3;
