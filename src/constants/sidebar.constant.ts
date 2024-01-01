import { PageRoute, PermissionUserEnum, RoleUserEnum } from "@/enums"
import { SidebarItem } from "@/models"
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons"

export const SIDE_BARS: SidebarItem[] = [
    {
        key: PageRoute.Dashboard,
        link: PageRoute.Dashboard,
        label: "Dashboard",
        icon: AppstoreOutlined,
        permission: "",
    },
    {
        key: PermissionUserEnum.CategoryManagement,
        link: PageRoute.Categories,
        label: "Category",
        icon: AppstoreOutlined,
        permission: PermissionUserEnum.CategoryManagement,
    },
    {
        key: "master_cate_type",
        link: PageRoute.ContentTypeManagements,
        label: "Master Cate Type",
        icon: AppstoreOutlined,
        permission: PermissionUserEnum.CategoryManagement,
    },
    {
        key: PermissionUserEnum.CouponManagement,
        link: PageRoute.Coupons,
        label: "Coupon",
        icon: AppstoreOutlined,
        permission: PermissionUserEnum.CouponManagement,
    },
    {
        key: "admin",
        label: "Admin",
        icon: SettingOutlined,
        permission: PermissionUserEnum.UserManagement,
        children: [
            {
                key: PermissionUserEnum.UserManagement,
                link: PageRoute.UserManagement,
                label: "User Management",
                permission: PermissionUserEnum.UserManagement,
                roles: [RoleUserEnum.Admin, RoleUserEnum.Staff, RoleUserEnum.Partner],
            },
        ],
    },
]
