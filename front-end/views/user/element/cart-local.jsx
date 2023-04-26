import React from "react";

// Layout
import { useDispatch, useSelector } from "react-redux";
import { removeCartCombo, removeCartPackage } from "../../../redux/reducers/order";
import { combieImg } from "../../../utils/index";

export const BodyCartLocal = () => {
  const { data } = useSelector((state) => state.order);
  const { packages, combos } = data;

  const dispatch = useDispatch();

  return (
    <>
      {[...packages].map((x, index) => (
        <div key={x.id + " " + index} className="bg-white" style={{ margin: "15px 0px", borderRadius: "5px", boxShadow: "0px 5px 20px rgb(0 0 0 / 20%)" }}>
          <div className="row bg-orange2" style={{ margin: "0px", height: "40px" }}> <div className="col-md-12 col-lg-8 col-sm-12"></div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2" style={{ margin: "auto" }} >
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x.salePrice)}
            </div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center align-middle" style={{ margin: "auto" }} >
              <span
                style={{ cursor: "pointer" }}
                className="badge badge-danger"
                onClick={() => dispatch(removeCartPackage(x.id))}
              >
                Xóa
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6 col-sm-12">
              <div className="media align-items-center font-weight-semibold align-middle p-2">
                <img
                  style={{ height: "50px", borderRadius: "5px", objectFit: "cover" }}
                  src={combieImg(x.image)}
                  className="d-block ui-w-40 ui-bordered mr-4"
                  alt=""
                  width={100}
                  onError={({ currentTarget }) => {
                    currentTarget.src =
                      "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                  }}
                />
                <div className="media-body">
                  {x.title}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x.salePrice)}
            </div>
          </div>
        </div>
      ))}
      {[...combos].map((x, index) => (
        <div key={x.id + " " + index} className="bg-white" style={{ margin: "15px 0px", borderRadius: "5px", boxShadow: "0px 5px 20px rgb(0 0 0 / 20%)" }}>
          <div className="row bg-orange2" style={{ margin: "0px", height: "40px" }}>
            <div style={{ margin: "auto" }} className="col-md-12 col-lg-8 col-sm-12 ">
              {x?.title}</div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold" style={{ margin: "auto" }} >
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x.comboPackages.reduce(
                (pre, x) => pre + x.salePrice,
                0
              ))}
            </div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center" style={{ margin: "auto" }} >
              <span
                style={{ margin: "0 auto", cursor: "pointer" }}
                className="badge badge-danger"
                onClick={() => dispatch(removeCartCombo(x.id))}
              >
                Xóa
              </span>
            </div>
          </div>
          {x.comboPackages.map((item, i) => {
            return (
              <div className="row" key={item.id}>
                <div className="col-md-12 col-lg-6 col-sm-12 ">
                  <div className="media align-items-center font-weight-semibold align-middle p-2">
                    <img
                      style={{ height: "50px", borderRadius: "5px", objectFit: "cover" }}
                      src={combieImg(item?._package?.image)}
                      className="d-block ui-w-40 ui-bordered mr-4"
                      alt=""
                      width={100}
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                    <div className="media-body ">
                      {item?._package?.title}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item._package.salePrice)}
                </div>
              </div>
            )
          }
          )}
        </div>
      ))}
    </>
  );
};

export default BodyCartLocal;
