import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

// Images
import bannerImg from "../../images/background/bg2.jpg";
import { userApi } from "../../api/userApi";
import { useScript } from "../../hooks/useScript";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../images/logowhite.png";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setPopupAlertType] = useState("primary");
  const history = useHistory();

  const googlebuttonref = useRef();
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    console.log(userCred);
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.prompt();

    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "large",
      text: "signin",
    });
  });

  const handleLogin = async () => {
    // const regUsername = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    // const regPassword =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,20}$/;
    // const regEmail =
    //   /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // // if (!regEmail.test(username)) {
    //   setAlertMessage("Email is invalid");
    //   setAlertVisible(true);
    //   setPopupAlertType("danger");
    //   return;
    // }

    try {
      const param = {
        email: email,
        password: password,
      };

      if (email && password) {
        setAlertVisible(false);
        const response = await userApi.loginAccount(param);
        Cookies.set("id", response?.id);
        Cookies.set("username", response?.username);
        Cookies.set("access_token", response?.accessToken);
        Cookies.set("roles", response?.roles);
        const responseAvatar = await userApi.getUserDetail();
        Cookies.set("user", JSON.stringify(responseAvatar));
        toast.success("Login Successfully", {
          duration: 1500,
        });
        setTimeout(() => {
          history.push("/");
        }, 1500);
      } else {
        setAlertMessage("Email and Password is required");
        setAlertVisible(true);
        setPopupAlertType("danger");
      }
    } catch (responseError) {
      if (responseError?.data) {
        setAlertMessage(responseError?.data?.message);
        setAlertVisible(true);
        setPopupAlertType("danger");
      } else {
        toast.error("Server Error!", {
          duration: 5000,
        });
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="account-form">
        <div
          className="account-head"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <Link className="text-decoration-none" to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="heading-bx left">
              <h2 className="title-head">
                Đăng nhập <span>Tài khoản</span> của bạn
              </h2>
              <p>
                Chưa có tài khoản?{" "}
                <Link to="/register" >Tạo tài khoản</Link>
              </p>
            </div>
            <div
              className={`alert alert-${alertType} alert-dismissible fade show`}
              role="alert"
              style={{ display: `${alertVisible ? "" : "none"}` }}
            >
              {alertMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
            <form className="contact-bx">
              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email"
                        type="text"
                        required={true}
                        placeholder="Nhập Email..."
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu..."
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-forget">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlAutosizing"
                      >
                        Nhớ tài khoản
                      </label>
                    </div>
                    <Link to="/forget-password" className="ml-auto">
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <p
                    name="submit"
                    className="btn button-md"
                    onClick={() => handleLogin()}
                  >
                    Đăng nhập
                  </p>
                </div>
                <div className="col-lg-12">
                  <h6 className="m-b15">Đăng nhập với tài khoản google</h6>
                  <div ref={googlebuttonref}></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
