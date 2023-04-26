import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images
import logoWhite2 from "../../images/logo-white-2.png";
import bannerImg from "../../images/background/bg2.jpg";
import { userApi } from "../../api/userApi";
import { toast, Toaster } from "react-hot-toast";

function ForgetPassword(props) {
    const [email, setEmail] = useState();
    const [step, setStep] = useState(0);
    const [alertMessage, setAlertMessage] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setPopupAlertType] = useState("primary");

    const handleForgetPass = async () => {
        try {
            const param = {
                email: email,
            };
            userApi.forgetPassword(param).then((rs) => {
                toast.success(rs.message, {
                    duration: 2000
                });
                setStep(1);
            }).catch((e) => toast.error(e?.data?.message));
        } catch (responseError) {
            setAlertMessage(responseError?.data?.message);
            setAlertVisible(true);
            setPopupAlertType("danger");
        }
    };
    return (
        <>
            <div className="account-form">
                <div
                    className="account-head"
                    style={{ backgroundImage: "url(" + bannerImg + ")" }}
                >
                    <Link to="/">
                        <img src={logoWhite2} alt="" />
                    </Link>
                </div>
                {step === 0 ? (
                    <div className="account-form-inner">
                        <div className="account-container">
                            <div className="heading-bx left">
                                <h2 className="title-head">
                                    Quên <span>mật khẩu</span>
                                </h2>
                                <p>
                                    Đăng nhập tài khoản của bạn{" "}
                                    <Link to="/login">Đăng nhập</Link>
                                </p>
                            </div>
                            <div
                                className={`alert alert-${alertType} alert-dismissible fade show`}
                                role="alert"
                                style={{
                                    display: `${alertVisible ? "" : "none"}`,
                                }}
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
                                                    name="name"
                                                    type="email"
                                                    placeholder="Nhập địa chỉ Email"
                                                    required=""
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 m-b30">
                                        <p
                                            className="btn button-md"
                                            onClick={() => handleForgetPass()}
                                        >
                                            Nhận link kích hoạt
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="account-form-inner">
                        <div className="account-container">
                            <div className="heading-bx left">
                                <h2 className="title-head">
                                    Thông tin quên mật khẩu
                                </h2>
                                <p>
                                    Chúng tôi đã gửi thông tin link kích hoạt đổi mật khẩu qua email: {email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}

export default ForgetPassword;
