import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils";

function Slider1() {
  const [listSlider, setListSlider] = useState([]);

  const getListSlider = async () => {
    try {
      const response = await userApi.getAllSlider();
      setListSlider(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    getListSlider();
  }, []);

  return (
    <Slider {...settings} className="tt-slider slider-one slider-sp0 element-home">
      {listSlider.map((slider) => (
        <div
          key={slider?.id}
          className="slider-item"
        >
          <div width="100%">
            {/* eslint-disable-next-line */}
            <marquee
              loop="1"
              behavior="scroll"
              scrolldelay="1"
              direction="left"
              className="titledown"
            >
              {slider?.title}
            </marquee>
          </div>
          <div className="slider-thumb">
            <a href={slider?.url}> <img src={combieImg(slider?.imageUrl)} alt={slider?.title} /></a>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Slider1;
