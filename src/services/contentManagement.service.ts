import { DataResponse, ICategory, ICategoryType, IContentForm, IContentList } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const contentManagementService = createApi({
    reducerPath: "contentManagementService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getContentTypeManagementApi: builder.query<DataResponse<ICategoryType[]>, void>({
            query: () => ({
                url: "/content-mn/content-type",
                method: "GET",
            }),
            transformResponse: (response: ICategoryType[]) => {
                return {
                    data: response,
                }
            },
        }),
        getContentManagementApi: builder.query<DataResponse<IContentList>, { cate_type_id: string }>({
            query: (params) => ({
                url: `/fo/content/${params?.cate_type_id}`,
                method: "GET",
            }),
            transformResponse: (response: IContentList) => {
                return {
                    data: response,
                }
            },
        }),
        getCategoryContentManagementApi: builder.query<DataResponse<ICategory[]>, { project_id: string }>({
            query: (params: { project_id: string }) => ({
                url: `/content-mn/category-content/${params?.project_id}`,
                method: "GET",
            }),
            transformResponse: (response: ICategory[]) => {
                return {
                    data: response,
                }
            },
        }),
        getCategoryTypeContentManagementApi: builder.query<DataResponse<IContentList>, { cateTypeID: string }>({
            query: (params: { cateTypeID: string }) => ({
                url: `/content-mn/cate-type/${params?.cateTypeID}`,
                method: "GET",
            }),
            transformResponse: (response: IContentList) => {
                return {
                    data: response,
                }
            },
        }),
        createContentManagementApi: builder.mutation<string, IContentForm>({
            query: (body: IContentForm) => ({
                url: "/content-mn",
                body,
                method: "POST",
            }),
        }),
        updateContentManagementApi: builder.mutation<string, IContentForm>({
            query: (body: IContentForm) => ({
                url: `/content-mn/${body?.master_content_id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteContentManagementApi: builder.mutation<string, { master_content_id: string }>({
            query: (body) => ({
                url: `/content-mn/${body.master_content_id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetContentManagementApiQuery,
    useLazyGetContentManagementApiQuery,

    useGetContentTypeManagementApiQuery,
    useLazyGetContentTypeManagementApiQuery,

    useGetCategoryContentManagementApiQuery,
    useLazyGetCategoryContentManagementApiQuery,

    useGetCategoryTypeContentManagementApiQuery,
    useLazyGetCategoryTypeContentManagementApiQuery,

    useCreateContentManagementApiMutation,

    useUpdateContentManagementApiMutation,

    useDeleteContentManagementApiMutation,
} = contentManagementService
