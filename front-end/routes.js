import React from "react";

const Dashboard = React.lazy(() => import("./views/admin/dashboard/dashboard"));
const Users = React.lazy(() => import("./views/admin/users/users"));
const Subject = React.lazy(() => import("./views/admin/subjects/subjects"));
const Order = React.lazy(() => import("./views/admin/order/index"));
const Contact = React.lazy(() => import("./views/admin/contact/contact"));
const Trainee = React.lazy(() => import("./views/admin/trainee/index"));
const Coupon = React.lazy(() => import("./views/admin/coupon/coupon"));
const Class = React.lazy(() => import("./views/admin/class/class"));
const Posts = React.lazy(() => import("./views/admin/posts/posts"));
const Sliders = React.lazy(() => import("./views/admin/sliders/sliders"));
const FeedBack = React.lazy(() => import("./views/admin/feedback/feedback"));
const Packages = React.lazy(() => import("./views/admin/packages/packages"));
const Experts = React.lazy(() => import("./views/admin/expert/experts"));
const Combo = React.lazy(() => import("./views/admin/combo/combo"));
const Settings = React.lazy(() => import("./views/admin/settings/settings"));

const routes = [
    { path: "/", exact: true, name: "Trang chủ" },
    { path: "/admin/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/admin/users", name: "Người dùng", element: Users },
    { path: "/admin/contacts", name: "Chăm sóc khach hàng", element: Contact },
    { path: "/admin/subjects", name: "Môn học", element: Subject },
    { path: "/admin/orders", name: "Đơn hàng", element: Order },
    { path: "/admin/class", name: "Lớp học", element: Class },
    { path: "/admin/coupon", name: "Mã giảm giá", element: Coupon },
    { path: "/admin/trainee", name: "Học viên", element: Trainee },
    { path: "/admin/posts", name: "Bài viết", element: Posts },
    { path: "/admin/sliders", name: "Sliders", element: Sliders },
    { path: "/admin/feedback", name: "Phản hồi", element: FeedBack },
    { path: "/admin/packages", name: "Khóa học", element: Packages },
    { path: "/admin/experts", name: "Giảng viên", element: Experts },
    { path: "/admin/combos", name: "Combo", element: Combo },
    { path: "/admin/settings", name: "Cấu hình", element: Settings }
];

export default routes;
