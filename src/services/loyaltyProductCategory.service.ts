import { DataResponse, ILoyaltyCategory, IRequestPaging } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyProductCategoryService = createApi({
    reducerPath: "loyaltyProductCategoryService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getLoyaltyProductCategoriesApi: builder.query<DataResponse<ILoyaltyCategory[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-product-category",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyProductCategoryApi: builder.mutation<DataResponse<ILoyaltyCategory>, ILoyaltyCategory>({
            query: (body: ILoyaltyCategory) => ({
                url: `/loyal-product-category`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyProductCategoryApi: builder.mutation<string, ILoyaltyCategory>({
            query: (body) => ({
                url: `/loyal-product-category/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteLoyaltyProductCategoryApi: builder.mutation<string, ILoyaltyCategory>({
            query: (body: ILoyaltyCategory) => ({
                url: `/loyal-product-category/${body?.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetLoyaltyProductCategoriesApiQuery,
    useLazyGetLoyaltyProductCategoriesApiQuery,

    useCreateLoyaltyProductCategoryApiMutation,

    useUpdateLoyaltyProductCategoryApiMutation,

    useDeleteLoyaltyProductCategoryApiMutation,
} = loyaltyProductCategoryService
