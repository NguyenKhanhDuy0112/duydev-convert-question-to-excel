import { DataResponse, ICategory, IRequestPaging } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const categoryService = createApi({
    reducerPath: "categoryService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getCategoriesApi: builder.query<DataResponse<ICategory[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/category",
                params,
                method: "GET",
            }),
        }),
        createCategoryApi: builder.mutation<string, ICategory>({
            query: (body: ICategory) => ({
                url: "/category",
                body,
                method: "POST",
            }),
        }),
        updateCategoryApi: builder.mutation<string, ICategory>({
            query: (body: ICategory) => ({
                url: "/category",
                body,
                method: "PUT",
            }),
        }),
        deleteCategoryApi: builder.mutation<string, ICategory>({
            query: (body: ICategory) => ({
                url: `/category/${body.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetCategoriesApiQuery,
    useLazyGetCategoriesApiQuery,
    useCreateCategoryApiMutation,
    useUpdateCategoryApiMutation,
    useDeleteCategoryApiMutation,
} = categoryService
