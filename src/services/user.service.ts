import {
    DataResponse,
    IRequestPaging,
    IRequestPutGroupRolesForUserApi,
    IRoleUser,
    IUser,
    IUserChangePasswordForm,
} from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getUsersApi: builder.query<DataResponse<IUser[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/user",
                params,
                method: "GET",
            }),
        }),
        getGroupRolesApi: builder.query<DataResponse<IRoleUser[]>, void>({
            query: () => ({
                url: "/user/groups",
                method: "GET",
            }),
            transformResponse: (rawData: IRoleUser[]) => {
                return {
                    data: rawData,
                }
            },
        }),
        updateGroupRolesForUserApi: builder.mutation<string, IRequestPutGroupRolesForUserApi>({
            query: (body) => ({
                url: `/user/user-groups/${body?.user_id}`,
                body,
                method: "PUT",
            }),
        }),
        getUserProfileApi: builder.query<IUser, void>({
            query: () => ({
                url: "/user/profile",
                method: "GET",
            }),
        }),
        getGroupPermissionsApi: builder.query<DataResponse<IRoleUser[]>, void>({
            query: () => ({
                url: "/user/group-perms",
                method: "GET",
            }),
            transformResponse: (rawData: IRoleUser[]) => {
                return {
                    data: rawData,
                }
            },
        }),
        createRoleApi: builder.mutation<DataResponse<IRoleUser>, IRoleUser>({
            query: (body: IRoleUser) => ({
                url: `/user/group`,
                body,
                method: "POST",
            }),
        }),
        updateRoleApi: builder.mutation<DataResponse<IRoleUser>, IRoleUser>({
            query: (body: IRoleUser) => ({
                url: `/user/group/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        updateGroupPermissionForRole: builder.mutation<DataResponse<IRoleUser>, IRoleUser>({
            query: (body: IRoleUser) => ({
                url: `/user/group-permissions/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        getPermissionsApi: builder.query<DataResponse<IRoleUser[]>, void>({
            query: () => ({
                url: "/user/permissions",
                method: "GET",
            }),
            transformResponse: (rawData: IRoleUser[]) => {
                return {
                    data: rawData,
                }
            },
        }),
        createUserApi: builder.mutation<{ genPass: string }, IUser>({
            query: (body: IUser) => ({
                url: "/user",
                body,
                method: "POST",
            }),
        }),
        updateUserApi: builder.mutation<string, IUser>({
            query: (body: IUser) => ({
                url: `/user/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        resetPasswordUserApi: builder.mutation<{ genPass: string }, IUser>({
            query: (body: IUser) => ({
                url: `/user/reset-pass/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        changePasswordUserApi: builder.mutation<{ genPass: string }, IUserChangePasswordForm>({
            query: (body: IUserChangePasswordForm) => ({
                url: `/user/change-pass`,
                body,
                method: "PUT",
            }),
        }),
        deleteUserApi: builder.mutation<string, IUser>({
            query: (body: IUser) => ({
                url: `/user/${body.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetUsersApiQuery,
    useLazyGetUsersApiQuery,

    useGetGroupRolesApiQuery,
    useLazyGetGroupRolesApiQuery,

    useGetUserProfileApiQuery,
    useLazyGetUserProfileApiQuery,

    useGetGroupPermissionsApiQuery,
    useLazyGetGroupPermissionsApiQuery,

    useGetPermissionsApiQuery,
    useLazyGetPermissionsApiQuery,

    useCreateUserApiMutation,
    useUpdateUserApiMutation,
    useDeleteUserApiMutation,
    useResetPasswordUserApiMutation,
    useChangePasswordUserApiMutation,

    useUpdateGroupRolesForUserApiMutation,

    useUpdateGroupPermissionForRoleMutation,

    useCreateRoleApiMutation,
    useUpdateRoleApiMutation,
} = userService
