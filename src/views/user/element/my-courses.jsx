import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils/index";
import Paging from "../../Paging/Paging";

function MyCourses(props) {
  const [res, setRes] = useState({
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
  });

  const [pageIndex, setPageIndex] = useState(1);
  const { totalPages } = res;

  useEffect(() => {
    if (props.activeTab === 4)
    userApi.getMyCourese({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex, props.activeTab]);
 
  return (
    <>
      <div className="profile-head">
        <h5>Khóa học đã mua</h5>
      </div>

      <div className="courses-filter">
        <div className="table-responsive row">
              {res.data.map((item, i) => (
                <div className="col-md-6 col-lg-4 col-sm-6 m-b30" key={i}>
                  <div className="cours-bx">
                    <div className="action-box">
                      <img
                        src={
                          item?.apackage?.image != null && item?.apackage?.image
                            ? combieImg(item?.apackage?.image)
                            : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                        }
                        alt=""
                        onError={({ currentTarget }) => {
                          currentTarget.src =
                            "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                        }}
                      />
                      <Link
                        to={`/courses-details/${item?.apackage?.id}`}
                        className="btn m-3 btn-warning"
                      >
                        Học ngay
                      </Link>
                    </div>
                    <div className="info-bx">
                      <h5>{item.apackage.title}</h5>
                      <div>
                        <i className="fa fa-user"></i>{" "}
                        {item?.apackage?.sucjectCode?.expert?.user?.fullname}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="d-flex  justify-content-between align-items-center m-2">
          <Paging
            totalPage={totalPages}
            pageIndex={pageIndex}
            onChange={(e) => {
              setPageIndex(e);
            }}
          ></Paging>
        </div>
      </div>
    </>
  );
}

export default MyCourses;
