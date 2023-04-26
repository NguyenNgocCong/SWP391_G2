import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Layout
import Footer from "../../home/layout/footer/footer";
import Header from "../../home/layout/header/header";
import { useHistory, useLocation } from "react-router-dom";
import { userApi } from "../../../api/userApi";
import {
  TYPE_CHECKOUT_CLASS,
  TYPE_CHECKOUT_PACKAGE,
} from "../../../constants/index";
import { toast } from "react-toastify";
import { resetStateCart } from "../../../redux/reducers/order";
import { CForm, CFormInput } from "@coreui/react";
function CheckOut(prop) {
  const { data } = useSelector((state) => state.order);
  const { isLogin } = useSelector((state) => state.auth);
  const { packages, combos } = data;
  const location = useLocation();
  const history = useHistory();
  const [codeCoupon, setCodeCoupon] = useState("");
  const [codeCouponCheck, setCodeCouponCheck] = useState("");
  const [validated, setValidated] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  if (!location.state) {
    history.push("/");
  }
  const dispatch = useDispatch();
  const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
  const totalCombo = [...combos].reduce(
    (pre, x) => pre + x.comboPackages.reduce((pre, x) => pre + x.salePrice, 0),
    0
  );

  const handleAddCoupon = (e) => {
    if (codeCouponCheck) {
      userApi.checkCoupon(codeCouponCheck).then((res) => {
        setCodeCoupon(res.code);
        const totalCost = location.state.type === TYPE_CHECKOUT_PACKAGE ? (totalPackage + totalCombo) : location.state.class.packages.salePrice
        setDiscount(res.discountRate ? totalCost * res.discountRate / 100 : 0);
      })
        .catch((e) => toast.error(e?.data?.message));
    }
  }

  const handleCheckout = async (event) => {
    try {
      const form = event.currentTarget
      setValidated(true)
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity() || isLogin) {
        const { type } = location.state;
        if (type === TYPE_CHECKOUT_PACKAGE)
          if (isLogin) {
            userApi
              .payCarts(codeCoupon)
              .then((res) => {
                toast.success("checkout success");
                setTimeout(() => {
                  history.replace("/");
                }, 1000);
                dispatch(resetStateCart());
              })
              .catch((e) => toast.error(e?.data?.message));
          } else {
            userApi
              .orderClass({
                ...info,
                packages: [...packages].map((x) => x.id),
                combos: [...combos].map((x) => x.id),
                codeCoupon: codeCoupon,
              })
              .then((res) => {
                toast.success(res.message);
                setTimeout(() => {
                  history.replace("/");
                }, 1000);
                dispatch(resetStateCart());
              })
              .catch((e) => toast.error(e?.data?.message));
          }
        else if (type === TYPE_CHECKOUT_CLASS) {
          userApi
            .orderClass({
              ...info,
              codeCoupon: codeCoupon,
              classId: location.state.class.id,
            })
            .then((res) => {
              toast.success(res.message);
              dispatch(resetStateCart());
              setTimeout(() => {
                history.replace("/");
              }, 1000);
            })
            .catch((e) => toast.error(e?.data?.message));
        }
      }
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Header />

      <div className="container p-4">
        <CForm
          onSubmit={handleCheckout}
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
        >
          <h5 style={{ fontWeight: "bold", margin: "20px 0px" }}>Thanh toán (* là bắt buộc)</h5>
          <div className="row">
            <div className="col-md-8">
              {isLogin ? <></> : <>
                <h6 style={{ fontWeight: "bold", margin: "20px 0px" }}>1. Thông tin tài khoản</h6>
                <div className="border_checkout">
                  <div className="row">
                    <div className="col-md-4" >
                      <CFormInput
                        className="input__checkout "
                        type="text"
                        placeholder="Họ và tên *"
                        required
                        onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
                        feedbackInvalid="Vui lòng nhập họ tên!"
                      />
                    </div>
                    <div className="col-md-4">
                      <CFormInput
                        className="input__checkout"
                        type="text"
                        placeholder="Email *"
                        feedbackInvalid="Vui lòng nhập email!"
                        required
                        onChange={(e) => setInfo({ ...info, email: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CFormInput
                        className="input__checkout"
                        type="text"
                        required
                        placeholder="Số điện thoại *"
                        feedbackInvalid="Vui lòng nhập số điện thoại!"
                        onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
                      />
                    </div>
                  </div>
                </div></>
              }
              <h6 style={{ fontWeight: "bold", margin: "20px 0px" }}>{isLogin ? "1." : "2."} Thông tin thanh toán</h6>
              <div className="border_checkout">
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-user"></i> Tên chủ tài khoản: Nguyen Van Hung
                </div>
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-address-card"></i> Số tài khoản: 0586986918888
                </div>
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-bank"></i> Ngân hàng: Ngân hàng quân đội MBbank
                </div>
                <div>
                  {"Nội dùng chuyển khoản: Nộp học phí - <mã đơn hàng> - <Họ tên>"}
                </div>
                <div>
                  Thông tin kích hoạt khóa học sẽ được gửi đến địa chỉ email của bạn sau khi chúng tôi kiểm tra và xác nhận thông thanh toán của bạn thành công.
                </div>
                <div>
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    Lưu ý: Bạn có thế đóng tiền trực tiếp cho chứng tôi tại các cơ sở:
                  </div>
                  <div className="border_checkout">
                    <div>
                      <i className="ti-location-pin"></i> Cơ sở 1: Tòa nhà Keangnam - đường Phạm Hùng - Từ Liêm - Hà Nội.
                    </div>
                    <div>
                      <i className="ti-location-pin"></i> Cơ sở 2 2: Tòa nhà Intracom, ngõ 82, Dịch Vọng Hậu - Duy Tân - Cầu Giấy - Hà Nội.
                    </div>
                    <div>
                      Thời gian làm việc từ 8:30 - 18:00, từu thứ 2 đến thứ 6 hàng tuần.
                      <div style={{ color: "red", fontWeight: "bold" }}>
                        Chú ý trong trường hợp không tìm thấy văn phòng của chúng tôi vui lòng liên hệ : 0358283749 - 0373017185
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border_checkout" style={{ marginTop: "60px" }}>
                <h6>Sản phẩm</h6>
                {location.state.type === TYPE_CHECKOUT_PACKAGE && (
                  [...packages].map((item, index) => {
                    return (
                      <div className="row product_checkout" key={index}>
                        <div className="col-md-9" style={{ fontWeight: "bold" }}>
                          {item.title}
                        </div>
                        <div className="col-md-3 d-flex justify-content-end" style={{ fontWeight: "bold" }}>
                          <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice)}</div>
                        </div>
                      </div>)
                  })
                )}
                {location.state.type === TYPE_CHECKOUT_PACKAGE && (
                  [...combos].map((item) => {
                    return (
                      <div className="row product_checkout">
                        <div className="col-md-9" style={{ fontWeight: "bold" }}>
                          {item.title}
                        </div>
                        <div className="col-md-3 d-flex justify-content-end" style={{ fontWeight: "bold" }}>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.comboPackages.reduce(
                            (total, x) => total + x.salePrice,
                            0
                          ))}
                        </div>
                      </div>
                    )
                  })
                )}
                {location.state.type !== TYPE_CHECKOUT_PACKAGE && (
                  <div className="row product_checkout" style={{ fontWeight: "bold" }}>
                    <div className="col-md-9" >
                      <div>{location.state.class.packages.title}</div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-end" style={{ fontWeight: "bold" }}>
                      <div >{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(location.state.class.packages.salePrice)}</div>
                    </div>
                  </div>
                )}
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <h6>Tạm tính</h6>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end" style={{ fontWeight: "bold" }}>
                    {location.state.type === TYPE_CHECKOUT_PACKAGE ? (
                      <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPackage + totalCombo)}</p>
                    ) : (<p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(location.state.class.packages.salePrice)}</p>)}
                  </div>
                </div>
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <input
                      className="input__checkout"
                      type="text"
                      placeholder="Coupon code"
                      onChange={(e) => setCodeCouponCheck(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <button
                      className="btn btn-ms btn-warning"
                      type="button"
                      style={{ height: "25px", padding: "0px 15px", fontSize: "14px", margin: "auto 0" }}
                      onClick={() => handleAddCoupon()}
                    >
                      Thêm
                    </button>
                  </div>
                </div>
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <h6>Giảm giá</h6>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end" style={{ fontWeight: "bold" }}>
                    <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)}</p>
                  </div>
                </div>
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <h6>Tổng tiền</h6>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end" style={{ color: "red", fontWeight: "bold" }} >
                    {location.state.type === TYPE_CHECKOUT_PACKAGE ? (
                      <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPackage + totalCombo - discount)}</p>
                    ) : (<p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(location.state.class.packages.salePrice - discount)}</p>)}
                  </div>
                </div>
              </div>
              {(location.state.type !== TYPE_CHECKOUT_PACKAGE || (totalCombo + totalPackage) > 0) ? <button
                className="btn btn-ms btn-warning mt-2"
                type="submit"
              >
                Gửi đăng ký
              </button> : <>
                <div style={{ color: "red", fontWeight: "bold" }}>
                  Vui lòng thêm sản phẩm vào giỏ hàng trước khi muốn thanh toán
                </div>
              </>}

            </div>
          </div>
        </CForm>
      </div>
      <Footer />
    </>
  );
}

export default CheckOut;
