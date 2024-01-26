import { PageRoute, PermissionUserEnum, RoleUserEnum } from "@/enums"
import { SidebarItem } from "@/models"
import { AppstoreOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons"

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
        icon: InboxOutlined,
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
                key: PermissionUserEnum.MasterCenter,
                link: PageRoute.MasterCenter,
                label: "Master Center",
                icon: AppstoreOutlined,
                permission: PermissionUserEnum.CategoryManagement,
                roles: [RoleUserEnum.Admin, RoleUserEnum.Staff, RoleUserEnum.Partner],
            },
            {
                key: PermissionUserEnum.MasterPage,
                link: PageRoute.MasterPage,
                label: "Master Page",
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
        icon: UserOutlined,
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
    {
        key: "setting",
        label: "Setting",
        icon: UserOutlined,
        permission: PermissionUserEnum.UserManagement,
        children: [
            {
                key: PermissionUserEnum.SettingsManagement,
                link: PageRoute.SettingClearCache,
                label: "Clear cache",
                permission: PermissionUserEnum.UserManagement,
                roles: [RoleUserEnum.Admin, RoleUserEnum.Staff, RoleUserEnum.Partner],
            },
        ],
    },
]
