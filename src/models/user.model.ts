import { GenderEnum, RoleUserEnum } from "@/enums"
import { UploadChangeParam, UploadFile } from "antd/es/upload"

export interface IUser {
    id?: string
    image?: string | UploadChangeParam<UploadFile>
    first_name?: string
    last_name?: string
    phone?: string
    email?: string
    birthday?: Date | null
    gender?: GenderEnum
    groups?: IRoleUser[]
    is_active?: boolean
    role?: RoleUserEnum
    group_ids?: string[]
    created_at?: Date | null
    updated_at?: Date | null
    uUserGroup?: IUserGroup[]
    permissions?: IPermission[]
    permissions_name?: string[]
}

export interface IUserGroup {
    id?: string
    user_id?: string
    group_id?: string
    uGroups?: IRoleUser
    created_at?: Date | null
    updated_at?: Date | null
}

export interface IRoleUser {
    id?: string
    name?: string
    is_active?: boolean
    permissions?: IPermission[]
    permission_ids?: string[]
    uGroupPermission?: IGroupPermission[]
    created_at?: Date | null
    updated_at?: Date | null
}

export interface IGroupPermission {
    id?: string
    group_id?: string
    permission_id?: string
    uPermissions?: IPermission
    created_at?: Date | null
    updated_at?: Date | null
}

export interface IPermission {
    id?: string
    name?: string
    desc?: string
    group?: string
    is_active?: boolean
    created_at?: Date | null
    updated_at?: Date | null
}

export interface IRequestPutGroupRolesForUserApi {
    group_ids?: string[]
    user_id?: string
}

export interface IUserChangePasswordForm {
    current_password: string
    new_password: string
    confirm_password: string
}
