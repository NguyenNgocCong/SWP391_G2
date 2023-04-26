import React, { useState } from "react";
import { useSelector } from "react-redux";
// Layout
import Footer from "../../home/layout/footer/footer";
import Header from "../../home/layout/header/header";
import { toast } from "react-toastify";
import { CForm, CFormInput } from "@coreui/react";
import { Button } from "react-bootstrap";
import { userApi } from "../../../api/userApi";
import { Link } from "react-router-dom";
import logo from "../../../images/logopurple.png";

function ActiveCourse(prop) {
  const { isLogin } = useSelector((state) => state.auth);
  const [validated, setValidated] = useState(false);
  const [code, setCode] = useState("");

  const handleCheckout = async (event) => {
    try {
      const form = event.currentTarget
      setValidated(true)
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity()) {
        if (isLogin) {
          userApi
            .ActiveMyCourese({
              code: code,
            })
            .then((res) => {
              toast.success(res?.message);
            })
            .catch((e) => toast.error(e?.data?.message));
        } else {
          toast.error("bạn vui lòng đăng nhập trước", {
            duration: 2000,
          });
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
          className="row g-3 needs-validation text-center"
          noValidate
          validated={validated}
        >
          <div
            style={{ margin: "30px 0px" }}
          >
            <Link to="/">
              <img
                src={logo} alt="" />
            </Link>
          </div>
          <h3 style={{ fontWeight: "bold" }}>Kích hoạt khóa học</h3>
          <h5>Lưu ý: Mỗi khóa học chỉ cần kích hoạt 1 lần</h5>
          <div>1. Bạn chưa có tài khoản <b>đăng nhập</b>?, vui lòng <b>Đăng ký</b> tài khoản mới.</div>
          <div
            style={{ marginBottom: "40px" }}
          >
            2. Bạn đã có tài khoản <b>đăng nhập</b>?, vui lòng <b>Đăng nhập</b> tài khoản.
          </div>
          <CFormInput
            style={{ width: "50%", margin: "0px auto" }}
            placeholder="Mã kích hoạt *"
            type="text"
            required
            feedbackInvalid="Vui lòng nhập mã kích hoạt!"
            onChange={(e) => setCode(e.target.value)}
          ></CFormInput>
          <div
            style={{ marginTop: "40px" }}
          >
          </div>
          {!isLogin ? <div className="alert alert-danger" role={alert}>
            Vui lòng đăng nhập trước khi kích hoạt
          </div> : <></>}
          <div className="align-items-center">
            <Button
              className="btn btn-ms btn-warning mt-2"
              type="submit"
              disabled={!isLogin}
            >
              Gửi đăng ký
            </Button>
          </div>
          <div>Hỗ trợ: 0358283749 || 0372017185</div>
        </CForm>
      </div>
      <Footer />
    </>
  );
}

export default ActiveCourse;
