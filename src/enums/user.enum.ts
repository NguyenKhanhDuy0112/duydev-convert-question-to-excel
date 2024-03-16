export enum RoleUserEnum {
    Admin = "admin",
    Partner = "partner",
    Staff = "staff",
}

export enum GenderEnum {
    Male = 1,
    Female = 2,
    Other = 3,
}

export enum PermissionUserEnum {
    MediaManagement = "media_management",
    UserManagement = "user_management",
    ContentManagement = "content_management",
    CategoryManagement = "category_management",
    SettingsManagement = "settings_management",
    CouponManagement = "coupon_management",
    MasterPage = "master_page",
    MasterCenter = "master_center",
    UserInfo = "user_info",
    GroupRoleManagement = "group_role_management",
    ApprovalManagement = "approval_management",
    PageManagement = "page_management",
    ListMediaManagement = "list_media_management",
    ViewMedia = "view_media",

    LoyaltyViewMembers = "view_members",
    LoyaltyCreateMembers = "create_members",
    LoyaltyEditMembers = "edit_members",
    LoyaltyDeleteMembers = "delete_members",

    LoyaltyViewTags = "view_tags",
    LoyaltyCreateTags = "create_tags",
    LoyaltyEditTags = "edit_tags",
    LoyaltyDeleteTags = "delete_tags",

    LoyaltyTagManagement = "tag_management",

    LoyaltyViewProduct = "view_product",
    LoyaltyCreateProduct = "create_product",
    LoyaltyEditProduct = "edit_product",
    LoyaltyDeleteProduct = "delete_product",

    LoyaltyViewProductCategory = "view_product_category",
    LoyaltyCreateProductCategory = "create_product_category",
    LoyaltyEditProductCategory = "edit_product_category",
    LoyaltyDeleteProductCategory = "delete_product_category",
}
