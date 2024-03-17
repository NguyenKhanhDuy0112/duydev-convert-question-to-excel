import { DataResponse, ILoyaltyTag, IRequestPaging, IRoleUser, IUser } from "@/models"
import { baseQueryLoyaltyBO } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyTagService = createApi({
    reducerPath: "loyaltyTagService",
    baseQuery: baseQueryLoyaltyBO,
    endpoints: (builder) => ({
        getLoyaltyTagsApi: builder.query<DataResponse<ILoyaltyTag[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-tag",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyTagApi: builder.mutation<DataResponse<ILoyaltyTag>, IRoleUser>({
            query: (body: IRoleUser) => ({
                url: `/loyal-tag`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyTagApi: builder.mutation<string, ILoyaltyTag>({
            query: (body) => ({
                url: `/loyal-tag/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),

        deleteLoyaltyTagApi: builder.mutation<string, ILoyaltyTag>({
            query: (body: IUser) => ({
                url: `/loyal-tag/${body?.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetLoyaltyTagsApiQuery,
    useLazyGetLoyaltyTagsApiQuery,

    useCreateLoyaltyTagApiMutation,

    useUpdateLoyaltyTagApiMutation,

    useDeleteLoyaltyTagApiMutation,
} = loyaltyTagService
