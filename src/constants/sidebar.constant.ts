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
        key: PageRoute.ContentManagements,
        label: "Content Management",
        icon: AppstoreOutlined,
        permission: PermissionUserEnum.CategoryManagement,
        children: [
            {
                key: PermissionUserEnum.CategoryManagement,
                link: PageRoute.Categories,
                label: "Category",
                icon: AppstoreOutlined,
                permission: PermissionUserEnum.CategoryManagement,
                roles: [RoleUserEnum.Admin, RoleUserEnum.Staff, RoleUserEnum.Partner],
            },
            {
                key: "master_cate_type",
                link: PageRoute.MasterCenter,
                label: "Master Center",
                icon: AppstoreOutlined,
                permission: PermissionUserEnum.CategoryManagement,
                roles: [RoleUserEnum.Admin, RoleUserEnum.Staff, RoleUserEnum.Partner],
            },
            {
                key: PermissionUserEnum.CouponManagement,
                link: PageRoute.Coupons,
                label: "Coupon",
                icon: AppstoreOutlined,
                permission: PermissionUserEnum.CouponManagement,
                roles: [RoleUserEnum.Admin, RoleUserEnum.Staff, RoleUserEnum.Partner],
            },
            {
                key: PermissionUserEnum.MediaManagement,
                link: PageRoute.MediaManagement,
                label: "Media Management",
                icon: AppstoreOutlined,
                permission: PermissionUserEnum.CategoryManagement,
                roles: [RoleUserEnum.Admin, RoleUserEnum.Staff, RoleUserEnum.Partner],
            },
        ],
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
