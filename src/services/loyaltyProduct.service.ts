import { DataResponse, ILoyaltyProduct, IRequestPaging, IRoleUser } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyProductService = createApi({
    reducerPath: "loyaltyProductService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getLoyaltyProductsApi: builder.query<DataResponse<ILoyaltyProduct[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-product",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyProductApi: builder.mutation<DataResponse<ILoyaltyProduct>, ILoyaltyProduct>({
            query: (body: IRoleUser) => ({
                url: `/loyal-product`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyProductApi: builder.mutation<string, ILoyaltyProduct>({
            query: (body) => ({
                url: `/loyal-product/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),

        deleteLoyaltyProductApi: builder.mutation<string, ILoyaltyProduct>({
            query: (body: ILoyaltyProduct) => ({
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
} = loyaltyProductService
