import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//function
import BackToTop from "./element/back-top";
import PageScrollTop from "./element/page-scroll-top";
import Cookies from "js-cookie";
import Error401 from "./element/error-401";
import Error404 from "./element/error-404";

//home
import Index from "./home/index";
import ForgetPassword from "./auth/forget-password";
import ForgetPasswordInput from "./auth/forget-password-input";
import Login from "./auth/login";
import Register from "./auth/register";
import About2 from "./home/about-us/about";

import Profile from "./user/profile";

import ProductsUser from "./home/courses/courses";
import CoursesDetails from "./home/courses/course-details";


import BlogClassicSidebar from "./home/blogs/blogs";
import BlogDetails from "./home/blogs/blog-details";

import ComboHome from "./home/combos/combos";
import ComboDetailHome from "./home/combos/combo-detail";

import ClassUser from "./home/class/class";
import ClassUserDetails from "./home/class/class-detail";

import LecturersUser from "./home/teacher/teacher";
import LecturerDetails from "./home/teacher/teacher-detail";

import Cart from "./user/element/cart-local";
import CheckOut from "./user/element/checkout";
import ActiveCourse from "./user/element/active-course";
//admin
import Dashboard from "./admin/dashboard/dashboard";
import UserDetail from "./admin/users/user-detail";
import Users from "./admin/users/users";

import Class from "./admin/class/class";
import ClassDetail from "./admin/class/class-detail";

import Coupon from "./admin/coupon/coupon";
import CouponDetail from "./admin/coupon/coupon-detail";

import Trainee from "./admin/trainee/index";

import Combo from "./admin/combo/combo";
import ComboDetail from "./admin/combo/combo-detail";

import Contact from "./admin/contact/contact";
import ContactDetail from "./admin/contact/contact-detail";

import ExpertDetail from "./admin/expert/expert-detail";
import Experts from "./admin/expert/experts";

import PostDetail from "./admin/posts/post-detail";
import Posts from "./admin/posts/posts";

import Packages from "./admin/packages/packages";
import PackageDetail from "./admin/packages/package-detail";

import SettingDetail from "./admin/settings/setting-detail";
import Settings from "./admin/settings/settings";

import Sliders from "./admin/sliders/sliders";
import SliderDetail from "./admin/sliders/slider-detail";

import Feedback from "./admin/feedback/feedback";
import FeedbackDetail from "./admin/feedback/feedback-detail";

import SubjectDetail from "./admin/subjects/subject-detail";
import Subjects from "./admin/subjects/subjects";

// import OrderedDetail from "./admin/ordered/ordered-detail";
import Orders from "./admin/order/index";
import RegistrationDetail from "./admin/order/registration/registration-detail";
import OrdersDetail from "./admin/order/order-online/orders-detail";

import { getAllCartLocal } from "../redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";

function Markup(props) {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogin) {
      dispatch(getAllCartLocal());
    }
    // eslint-disable-next-line
  }, [isLogin, dispatch]);

  return (
    <>
      <BrowserRouter basename={"/"}>
        <Switch>
          <Route path="/" exact component={Index} />

          <Route path="/about" exact component={About2} />

          {/* Events */}
          {/* <Route path="/events" exact component={Events} />
                        <Route
                            path="/events-details"
                            exact
                            component={EventsDetails}
                        /> */}

          {/* Faq */}
          {/* Other Pages */}
          <Route path="/profile/:tabIndex" exact component={Profile} />
          <Route path="/error-404" exact component={Error404} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/forget-password" exact component={ForgetPassword} />
          <Route
            path="/reset-password/:token"
            exact
            component={ForgetPasswordInput}
          />
          <Route path="/profile" exact component={Profile} />

          {/* Courses */}
          <Route path="/products" exact component={ProductsUser} />
          <Route path="/lecturers" exact component={LecturersUser} />
          <Route path="/courses-details/:id" exact component={CoursesDetails} />

          {/* expert */}
          <Route path="/lecturers" exact component={LecturersUser} />
          <Route path="/lecturers/:id" exact component={LecturerDetails} />

          {/* Combos */}
          <Route path="/combo" exact component={ComboHome} />
          <Route path="/combo/:id" exact component={ComboDetailHome} />

          {/* class */}
          <Route path="/class" exact component={ClassUser} />
          <Route path="/class/:id" exact component={ClassUserDetails} />

          {/* Blog Pages */}
          <Route path="/blog" exact component={BlogClassicSidebar} />
          <Route path="/blog/:id" exact component={BlogDetails} />

          {/* Contact Us */}
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={CheckOut} />
          <Route path="/active-course" exact component={ActiveCourse} />

          {/* admin  */}
          <PrivateRoute path="/admin/dashboard" exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/admin/users" exact>
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/admin/users/:username" exact>
            <UserDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/contacts" exact>
            <Contact />
          </PrivateRoute>
          <PrivateRoute path="/admin/contacts/:username" exact>
            <ContactDetail />
          </PrivateRoute>

          {/* Subject */}
          <PrivateRoute path="/admin/subjects" exact>
            <Subjects />
          </PrivateRoute>
          <PrivateRoute path="/admin/subjects/:id" exact>
            <SubjectDetail />
          </PrivateRoute>
          {/* Order */}
          <PrivateRoute path="/admin/orders" exact>
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/admin/orders/:id" exact>
            <OrdersDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/registration/:id" exact>
            <RegistrationDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/orders-detail/:id" exact>
            <OrdersDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/registration-detail/:id" exact>
            <RegistrationDetail />
          </PrivateRoute>

          {/* Class */}
          <PrivateRoute path="/admin/class" exact>
            <Class />
          </PrivateRoute>
          <PrivateRoute path="/admin/class/:id" exact>
            <ClassDetail />
          </PrivateRoute>

          {/* Trainee */}
          <PrivateRoute path="/admin/trainee" exact>
            <Trainee />
          </PrivateRoute>

          {/* Coupon */}
          <PrivateRoute path="/admin/coupon" exact>
            <Coupon />
          </PrivateRoute>
          <PrivateRoute path="/admin/coupon/:id" exact>
            <CouponDetail />
          </PrivateRoute>

          {/* Expert */}
          <PrivateRoute path="/admin/experts" exact>
            <Experts />
          </PrivateRoute>
          <PrivateRoute path="/admin/experts/:id" exact>
            <ExpertDetail />
          </PrivateRoute>

          {/* Post */}
          <PrivateRoute path="/admin/posts" exact>
            <Posts />
          </PrivateRoute>
          <PrivateRoute path="/admin/posts/create" exact>
            <PostDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/posts/:id" exact>
            <PostDetail />
          </PrivateRoute>

          {/* Slider */}
          <PrivateRoute path="/admin/sliders" exact>
            <Sliders />
          </PrivateRoute>
          <PrivateRoute path="/admin/sliders/create" exact>
            <SliderDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/sliders/:id" exact>
            <SliderDetail />
          </PrivateRoute>

          {/* Feedback */}
          <PrivateRoute path="/admin/feedback" exact>
            <Feedback />
          </PrivateRoute>
          <PrivateRoute path="/admin/feedback/create" exact>
            <FeedbackDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/feedback/:id" exact>
            <FeedbackDetail />
          </PrivateRoute>

          {/* Product */}
          <PrivateRoute path="/admin/packages" exact>
            <Packages />
          </PrivateRoute>
          <PrivateRoute path="/admin/packages/create" exact>
            <PackageDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/packages/:id" exact>
            <PackageDetail />
          </PrivateRoute>

          {/* Combo */}
          <PrivateRoute path="/admin/combos" exact>
            <Combo />
          </PrivateRoute>
          <PrivateRoute path="/admin/combos/create" exact>
            <ComboDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/combos/:id" exact>
            <ComboDetail />
          </PrivateRoute>

          {/* Settings */}
          <PrivateRoute path="/admin/settings" exact>
            <Settings />
          </PrivateRoute>
          <PrivateRoute path="/admin/settings/create" exact>
            <SettingDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/settings/:id" exact>
            <SettingDetail />
          </PrivateRoute>

          <Route path="/error-401" exact component={Error401} />
        </Switch>

        <PageScrollTop />
      </BrowserRouter>

      <BackToTop />
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  let isAuthenticated = false;
  if (Cookies.get("roles") === "ROLE_ADMIN") isAuthenticated = true;
  else {
    if (
      (rest?.path?.includes("combos") ||
        rest?.path?.includes("class") ||
        rest?.path?.includes("dashboard") ||
        rest?.path?.includes("packages") ||
        rest?.path?.includes("subjects") ||
        rest?.path?.includes("trainee") ||
        rest?.path?.includes("experts")) &&
      Cookies.get("roles") === "ROLE_MANAGER"
    )
      isAuthenticated = true;
    else if (
      (rest?.path?.includes("contacts") ||
        rest?.path?.includes("trainee") ||
        rest?.path?.includes("class") ||
        rest?.path?.includes("orders") ||
        rest?.path?.includes("coupon") ||
        rest?.path?.includes("sliders") ||
        rest?.path?.includes("feedback") ||
        rest?.path?.includes("dashboard") ||
        rest?.path?.includes("posts")) &&
      Cookies.get("roles") === "ROLE_SUPPORTER"
    )
      isAuthenticated = true;
    // else if (
    //   rest?.path?.includes("experts") &&
    //   Cookies.get("roles") === "ROLE_EXPERT"
    // )
    //   isAuthenticated = true;
    else if (
      (rest?.path?.includes("feedback") || rest?.path?.includes("posts") || rest?.path?.includes("sliders") || rest?.path?.includes("dashboard")) &&
      Cookies.get("roles") === "ROLE_MARKETER"
    )
      isAuthenticated = true;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/error-404",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Markup;
