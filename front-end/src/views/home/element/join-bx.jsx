import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";

const JoinBx = () => {
  const [count, setCount] = useState(0);
  const getListPackage = async () => {
    try {
      const response = await adminApi.getAllPackageView({
        page: 0,
        size: 1000,
      });
      setCount(response?.data?.length);
    } catch (responseError) {
      console.log(responseError);
    }
  };
  useEffect(() => {
    getListPackage();
  }, []);

  return (
    <>
      <div className="section-area bg-fix ovbl-dark join-bx">
        <div className="container">
          <div className="row join-content-bx text-white">
            <div className="col-md-9">
              <h3> </h3>
            </div>
            <div className="col-md-2">
              <h4>
               {count}+ Khóa học
              </h4>
            </div>
            <div className="col-md-1 text-right">
              <Link to="/products" className="btn btn-warning button-md">
                Xem ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinBx;
