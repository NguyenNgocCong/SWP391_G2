import React, { useState } from "react";
import toast from "react-hot-toast";
import { userApi } from "../../../api/userApi";
import avatarProfile from '../../../images/icon/avatar.svg'
import Cookies from "js-cookie";
import {  useDispatch } from "react-redux";
import { setEditAvatar } from "../../../redux/reducers/user";
import { combieImg } from "../../../utils";

function EditProfile({ stateChanger, state, user }) {
    const [fullname, setFullname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setPopupAlertType] = useState("primary");
    const acceptedFileType = ["image/jpg", "image/png", "image/jpeg"];
    const dispatch = useDispatch();

    const handleChangeProfile = async () => {
        try {
            //upload avatar
            if (avatar !== undefined)
                if (!acceptedFileType.includes(avatar?.type)) {
                    setAlertMessage("file type not accept");
                    setAlertVisible(true);
                    setPopupAlertType("error");
                    return;
                } else {
                    const formData = new FormData();
                    formData.append("avatar", avatar, avatar?.name);
                    const responseUploadAvatar = await userApi.uploadAvatar(
                        formData
                    );
                    console.log(responseUploadAvatar);
                }

            //update profile
            const param = {
                username: username,
                fullname: fullname,
                phoneNumber: phoneNumber,
            };
            const response = await userApi.updateInfo(param, user?.id);
            const getNewInfo = await userApi.getUserDetail();
            Cookies.set("user", JSON.stringify(getNewInfo));
            stateChanger(!state);
            setAlertMessage(response?.message);
            setAlertVisible(true);
            setPopupAlertType("success");
            toast.success("update sucessfully", {
                duration: 2000,
            });
            dispatch(setEditAvatar(true));
        } catch (responseError) {
            toast.error(responseError?.data?.message, {
                duration: 2000,
            });
        }
    };

    const handleAvatar = (e) => {
        const fileDropped = e.target.files[0];
        setAvatar(fileDropped)
        const previewUrl = URL.createObjectURL(fileDropped);
        setAvatarPreview(previewUrl);
    }


    return (
        <>
            <div className="profile-head">
                <h5>Edit Profile</h5>
            </div>
            <form className="edit-profile">
                <div className="">
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                            <h3>Personal Details</h3>
                        </div>
                    </div>
                    <div
                        className={`alert alert-${alertType} fade show`}
                        role="alert"
                        style={{ display: `${alertVisible ? "" : "none"}` }}
                    >
                        {alertMessage}
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Email
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={user?.email}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Username
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={user?.username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Full Name
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={user?.fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Phone No.
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                defaultValue={user?.phoneNumber}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label"></div>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <img
                                style={{ width: "100px", height: "100px" }}
                                src={ avatarPreview ? avatarPreview : ((user?.avatar != null && user?.avatar) ? combieImg(user?.avatar):  avatarProfile)}
                                alt="avatar user"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Upload Avatar
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="file"
                                accept=".jpg, .png, .jpeg"
                                onChange={(e) => handleAvatar(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="row">
                            <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label"></div>
                            <div className="col-12 col-sm-9 col-md-9 col-lg-7 d-flex align-items-center">
                                <span
                                    onClick={() => handleChangeProfile()}
                                    className="btn m-r10"
                                >
                                    Save changes
                                </span>
                                <button type="reset" className="btn-secondry">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EditProfile;
