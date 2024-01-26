import { DataResponse, ICategory, ICoupon, ICouponType, IRequestPaging, IRoleUser, IUser } from "@/models"
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
        getUserprofileApi: builder.query<DataResponse<IUser>, void>({
            query: () => ({
                url: "/user/profile",
                method: "GET",
            }),
        }),
        getPermissionsApi: builder.query<DataResponse<IRoleUser[]>, void>({
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
        createUserApi: builder.mutation<string, IUser>({
            query: (body: ICategory) => ({
                url: "/user",
                body,
                method: "POST",
            }),
        }),
        updateUserApi: builder.mutation<string, IUser>({
            query: (body: ICategory) => ({
                url: `/user/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteUserApi: builder.mutation<string, IUser>({
            query: (body: ICategory) => ({
                url: `/user/${body.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetUsersApiQuery,
    useLazyGetUsersApiQuery,

    useGetUserprofileApiQuery,
    useLazyGetUserprofileApiQuery,

    useGetPermissionsApiQuery,
    useLazyGetPermissionsApiQuery,

    useCreateUserApiMutation,
    useUpdateUserApiMutation,
    useDeleteUserApiMutation,
} = userService
