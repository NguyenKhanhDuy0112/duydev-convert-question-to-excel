import { DataResponse, IRequestPaging, IRequestPutGroupRolesForUserApi, IRoleUser, IUser } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyTagService = createApi({
    reducerPath: "loyaltyTagService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getLoyaltyProductsApi: builder.query<DataResponse<IUser[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-product",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyProductApi: builder.mutation<DataResponse<IRoleUser>, IRoleUser>({
            query: (body: IRoleUser) => ({
                url: `/loyal-product`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyProductApi: builder.mutation<string, IRequestPutGroupRolesForUserApi>({
            query: (body) => ({
                url: `/loyal-product/${body?.user_id}`,
                body,
                method: "PUT",
            }),
        }),

        deleteLoyaltyProductApi: builder.mutation<string, IUser>({
            query: (body: IUser) => ({
                url: `/loyal-product/${body?.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetLoyaltyProductsApiQuery,
    useLazyGetLoyaltyProductsApiQuery,

    useCreateLoyaltyProductApiMutation,

    useUpdateLoyaltyProductApiMutation,

    useDeleteLoyaltyProductApiMutation,
} = loyaltyTagService
