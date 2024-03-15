import { DataResponse, IRequestPaging, IRequestPutGroupRolesForUserApi, IRoleUser, IUser } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyMemberService = createApi({
    reducerPath: "loyaltyMemberService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getLoyaltyMemberApi: builder.query<DataResponse<IUser[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-members",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyMemberApi: builder.mutation<DataResponse<IRoleUser>, IRoleUser>({
            query: (body: IRoleUser) => ({
                url: `/loyal-members`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyMemberApi: builder.mutation<string, IRequestPutGroupRolesForUserApi>({
            query: (body) => ({
                url: `/loyal-members`,
                body,
                method: "PUT",
            }),
        }),
    }),
})

export const {
    useGetLoyaltyMemberApiQuery,
    useLazyGetLoyaltyMemberApiQuery,

    useCreateLoyaltyMemberApiMutation,

    useUpdateLoyaltyMemberApiMutation,
} = loyaltyMemberService
