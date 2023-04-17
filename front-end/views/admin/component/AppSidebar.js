import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import logo from "../../../images/logo.png";
import navigation from "../../../_nav";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const AppSidebar = () => {
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);


    const [role, setRole] = useState("");
    // eslint-disable-next-line
    const [listNavigation, setListNavigation] = useState([]);

    useEffect(() => {
        setRole(JSON.parse(Cookies.get("user"))?.role);
    }, []);
    useEffect(() => {
        if (navigation.length) {
            if (role === "ROLE_MANAGER") {
                const newList = navigation.filter(element => element.to === "Manager" || element.name === "Dashboard")
                setListNavigation(newList);
                // navigation.forEach((element) => {
                //     if (element.to === "Supporter" || element.to === "Marketer") {
                //         const item = element.items?.filter(ele => ele.to === "/admin/coupon"  || ele.to === "/admin/posts" 
                //         )
                //         element.items = item;
                //         newList.push(element);  }
                // });
            } else if (role === "ROLE_MARKETER") {
                const newList = navigation.filter(element => element.to === "Marketer" || element.name === "Dashboard")
                setListNavigation(newList);
            } else if (role === "ROLE_SUPPORTER") {
                const newList = [];
                navigation.forEach((element) => {
                    if (element.to === "Supporter" || element.to === "Marketer" || element.name === "Dashboard") {
                        newList.push(element);
                    }
                    else if (element.to === "Manager") {
                        const item = element.items?.filter(ele => ele.to === "/admin/class" || 
                        ele.to === "/admin/trainee"  || ele.to === "/admin/feedback" 
                        )
                        element.items = item;
                        newList.push(element);
                    }
                });
                setListNavigation(newList);
            } else if (role === "ROLE_ADMIN") {
                setListNavigation(navigation)
            }
        }
    }, [role]);

    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: "set", sidebarShow: visible });
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" style={{ backgroundColor: "#FFFFFF", border: "solid 1px #cfd8dc" }} to="/">
                <Link to="/">
                    <img src={logo} alt="" style={{ height: "50px" }} />
                </Link>
            </CSidebarBrand>
            <CSidebarNav style={{ background: '#fff' }}>
                <SimpleBar>
                    <AppSidebarNav items={listNavigation} />
                </SimpleBar>
            </CSidebarNav>
            {/* <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() =>
                    dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
                }
            /> */}
        </CSidebar>
    );
};

export default React.memo(AppSidebar);
