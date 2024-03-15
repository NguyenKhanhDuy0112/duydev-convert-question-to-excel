import { DataResponse, IRequestPaging, IRequestPutGroupRolesForUserApi, IRoleUser, IUser } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyProductCategoryService = createApi({
    reducerPath: "loyaltyProductCategoryService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getLoyaltyProductCategoriesApi: builder.query<DataResponse<IUser[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-product-category",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyProductCategoryApi: builder.mutation<DataResponse<IRoleUser>, IRoleUser>({
            query: (body: IRoleUser) => ({
                url: `/loyal-product-category`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyProductCategoryApi: builder.mutation<string, IRequestPutGroupRolesForUserApi>({
            query: (body) => ({
                url: `/loyal-product-category/${body?.user_id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteLoyaltyProductCategoryApi: builder.mutation<string, IUser>({
            query: (body: IUser) => ({
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
