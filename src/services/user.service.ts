import { DataResponse, IRequestPaging, IRequestPutGroupRolesForUserApi, IRoleUser, IUser } from "@/models"
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
        getUserprofileApi: builder.query<DataResponse<IUser>, void>({
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
        createUserApi: builder.mutation<string, IUser>({
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

    useGetUserprofileApiQuery,
    useLazyGetUserprofileApiQuery,

    useGetGroupPermissionsApiQuery,
    useLazyGetGroupPermissionsApiQuery,

    useGetPermissionsApiQuery,
    useLazyGetPermissionsApiQuery,

    useCreateUserApiMutation,
    useUpdateUserApiMutation,
    useDeleteUserApiMutation,

    useUpdateGroupRolesForUserApiMutation,

    useUpdateGroupPermissionForRoleMutation,
} = userService
