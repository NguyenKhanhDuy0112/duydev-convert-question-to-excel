import { RoleUserEnum } from "@/enums"

export interface IUser {
    id?: string
    first_name?: string
    last_name?: string
    phone?: string
    email?: string
    birthday?: Date | null
    groups?: IRoleUser[]
    is_active?: boolean
    role?: RoleUserEnum
    created_at?: Date | null
    updated_at?: Date | null
    uUserGroup?: IUserGroup[]
    permissions?: IPermission[]
}

export interface IUserGroup {
    id?: string
    user_id?: string
    group_id?: string
    uGroups?: IRoleUser
}

export interface IRoleUser {
    id?: string
    name?: string
    is_active?: boolean
    permissions?: IPermission[]
    uGroupPermission?: IGroupPermission[]
}

export interface IGroupPermission {
    id?: string
    group_id?: string
    permission_id?: string
    uPermissions?: IPermission
}

export interface IPermission {
    id?: string
    name?: string
    desc?: string
    is_active?: boolean
}
