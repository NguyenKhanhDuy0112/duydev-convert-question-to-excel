import { DataResponse, ILoyaltyMember, IRequestPaging } from "@/models"
import { baseQueryLoyaltyBO } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyMemberService = createApi({
    reducerPath: "loyaltyMemberService",
    baseQuery: baseQueryLoyaltyBO,
    endpoints: (builder) => ({
        getLoyaltyMemberApi: builder.query<DataResponse<ILoyaltyMember[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-members",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyMemberApi: builder.mutation<DataResponse<ILoyaltyMember>, ILoyaltyMember>({
            query: (body: ILoyaltyMember) => ({
                url: `/loyal-members`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyMemberApi: builder.mutation<string, ILoyaltyMember>({
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
