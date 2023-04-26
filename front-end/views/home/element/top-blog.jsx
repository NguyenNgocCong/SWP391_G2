import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils";

const RecentTopsSlider = () => {
  const [listPost, setListPost] = useState([]);
  const getListPost = async () => {
    try {
      const response = await userApi.getListTopViewPost(8);
      setListPost(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };
  useEffect(() => {
    getListPost();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="section-area section-sp1">
        <div className="container">
          <div className="heading-bx left">
            <h2 className="title-head">
              TOP <span>Blogs</span>
            </h2>
            <p>
              Nơi chứa đựng kho tàng kiến thức khổng lồ giúp bạn vươn tới
              ước mơ của bạn
            </p>
          </div>
          <Slider
            {...settings}
            className="recent-news-carousel slick-slider owl-btn-1"
          >
            {listPost.map((item) => (
              <div className="slider-item" key={item?.id}>
                <div className="recent-news">
                  <div className="action-box">
                    <img
                      src={combieImg(item?.thumnailUrl)}
                      style={{ objectFit: "cover" }}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                  </div>
                  <div className="info-bx">
                    <h5 className="post-title">
                      <div to={`/blog/${item?.id}`}>{item.title}</div>
                    </h5>
                    <ul className="media-post">
                      <li>
                        <i className="fa fa-calendar"></i>
                        {" " + new Date(item?.createDate).toLocaleDateString()}
                      </li>
                      <li>
                        <i className="fa fa-user"></i> Bởi{" "}
                        {item?.author.fullname}
                      </li>
                      <li style={{width:"100px"}}>
                        <i className="fa fa-eye"></i> {item?.views}
                      </li>
                    </ul>
                    <p>{item.brefInfo}</p>
                    <div
                      onClick={() => {
                        window.location.href = "/blog/" + item?.id;
                      }}
                      className="btn btn-warning m-2"
                    >
                      Đọc thêm
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default RecentTopsSlider;
