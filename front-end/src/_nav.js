import { CNavGroup, CNavItem } from "@coreui/react";


const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: "fa fa-home",
        badge: {
            color: "info",
            text: "NEW",
        }
    },
    {
        component: CNavGroup,
        name: 'Quản trị hệ thống',
        icon: "fa fa-server",
        items: [
            {
                component: CNavItem,
                name: "Người dùng",
                to: "/admin/users",
                icon: "fa fa-user",
            },
            {
                component: CNavItem,
                name: "Cấu hình",
                to: "/admin/settings",
                icon: "fa fa-sliders",
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Quản lý học tập',
        icon: "fa fa-slideshare",
        to:"Manager",
        items: [
            {
                component: CNavItem,
                name: "Môn học",
                to: "/admin/subjects",
                icon: "fa fa-book",
            },
            {
                component: CNavItem,
                name: "Khóa học",
                to: "/admin/packages",
                icon: "fa fa-folder",
            },
            {
                component: CNavItem,
                name: "Lớp học",
                to: "/admin/class",
                icon: "fa fa-users",
            },
            {
                component: CNavItem,
                name: "Combo",
                to: "/admin/combos",
                icon: "fa fa-inbox",
            },
            {
                component: CNavItem,
                name: "Giảng viên",
                to: "/admin/experts",
                icon: "fa fa-user-md",
            }, 
            {
                component: CNavItem,
                name: "Học viên",
                to: "/admin/trainee",
                icon: "fa fa-user-circle",
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Nội dung website',
        icon: "fa fa-signal",
        to:"Marketer",
        items: [
            {
                component: CNavItem,
                name: "Bài viết",
                to: "/admin/posts",
                icon: "fa fa-bookmark",
            },
            {
                component: CNavItem,
                name: "Slider",
                to: "/admin/sliders",
                icon: "fa fa-image",
            },
            {
                component: CNavItem,
                name: "Phản hồi",
                to: "/admin/feedback",
                icon: "fa fa-stack-exchange",
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Bán hàng',
        icon: "fa fa-shopping-bag",
        to:"Supporter",
        items: [
            {
                component: CNavItem,
                name: 'Đơn hàng',
                to: '/admin/orders',
                icon: "fa fa-shopping-cart",
            },
            {
                component: CNavItem,
                name: "Mã giảm giá",
                to: "/admin/coupon",
                icon: "fa fa-table",
            },
            {
                component: CNavItem,
                name: "Hỗ trợ khách hàng",
                to: "/admin/contacts",
                icon: "fa fa-user",
            }
        ]
    }
];

export default _nav;
