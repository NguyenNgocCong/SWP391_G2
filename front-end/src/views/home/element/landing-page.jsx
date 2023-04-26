import { CListGroup, CListGroupItem } from "@coreui/react";
import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Slider1 from "./slider";
import { userApi } from "../../../api/userApi";
import toast from "react-hot-toast";
import bg1 from '../../../images/background/bg1.jpg';

function OnlineCourses() {
  const history = useHistory();
  const [listCategory, setListCategory] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const getListCategory = async () => {
    try {
      const response = await userApi.getListCategoryPost();
      setListCategory(response);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const getAllSubject = async () => {
    try {
      const response = await userApi.getListAllSubject();
      setListSubject(response.splice(0, 7))
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };
  if (listCategory?.length === 0) {
    getListCategory();
  }
  if (listSubject?.length === 0) {
    getAllSubject();
  }

  let marginRoot = window.innerHeight - 80 - 445 - 60 >= 20 ? (window.innerHeight - 80 - 445 - 60) / 2 : 10;



  return (
    <div className="section-area bg-fix ovbl-dark" style={{ backgroundImage: "url(" + bg1 + ")", padding: marginRoot + "px 0px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-3" >
            <div
              className="menu-links navbar-collapse"
              id="menuDropdown"
            >
              <CListGroup className="nav navbar-nav d-flex element-home-left">
                <CListGroupItem className="font-weight-bold list-homepage">
                  <div className="d-flex justify-content-between">
                    Kiến thức
                    <div>
                      <i className="fa fa-chevron-right"></i>
                    </div>
                  </div>
                  <ul className="sub-menu right">
                    {listCategory.map((category) => {
                      return (
                        <li key={category?.setting_id}>
                          <div
                            onClick={() => {
                              history.push("/blog", {
                                category: category.setting_id,
                              });
                            }}
                          >
                            {" "}
                            {category.setting_title}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </CListGroupItem>
                <CListGroupItem
                  className="font-weight-bold list-homepage"
                  onClick={() => {
                    window.location.href = "/products";
                  }}
                >
                  <div>Tất cả khóa học</div>
                </CListGroupItem>
                <CListGroupItem
                  className="font-weight-bold list-homepage"
                  onClick={() => {
                    window.location.href = "/combo";
                  }}
                >
                  <div>Combo</div>
                </CListGroupItem>
                <CListGroupItem
                  className="font-weight-bold list-homepage"
                  onClick={() => {
                    window.location.href = "/lecturers";
                  }}
                >
                  <div>Giảng viên</div>
                </CListGroupItem>
                {listSubject.map((elment) => {
                  return (
                    <CListGroupItem
                      key={elment?.id}
                      className="font-weight-bold list-homepage"
                      onClick={() => {
                        history.push("/products", {
                          category: elment?.id,
                        });
                      }}
                    >
                      <div>{elment?.name}</div>
                    </CListGroupItem>
                  );
                })}
              </CListGroup>
            </div>
          </div>
          <div className="col-md-9 " style={{ padding: "0px 12px" }}>
            <Slider1
            ></Slider1>
          </div>
        </div>
      </div >
    </div>
  );
}

export default OnlineCourses;
