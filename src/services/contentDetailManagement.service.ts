import { DataResponse, ICategory, IContentDetailForm } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const contentDetailManagementService = createApi({
    reducerPath: "contentDetailManagementService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getContentDetailManagementApi: builder.query<DataResponse<ICategory[]>, { master_content_id: string }>({
            query: (params: { master_content_id: string }) => ({
                url: `/content-detail-mn/${params?.master_content_id}`,
                method: "GET",
            }),
        }),
        createContentDetailManagementApi: builder.mutation<string, IContentDetailForm>({
            query: (body: IContentDetailForm) => ({
                url: "/content-detail-mn",
                body,
                method: "POST",
            }),
        }),
        updateContentDetailManagementApi: builder.mutation<string, IContentDetailForm>({
            query: (body: IContentDetailForm) => ({
                url: `/content-detail-mn/${body?.master_content_detail_id}`,
                body,
                method: "PUT",
            }),
        }),
        updateStatusContentDetailManagementApi: builder.mutation<string, IContentDetailForm>({
            query: (body: IContentDetailForm) => ({
                url: `/content-detail-mn/approve-reject/${body?.master_content_detail_id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteContentDetailManagementApi: builder.mutation<string, { master_content_detail_id: string }>({
            query: (body) => ({
                url: `/content-detail-mn/${body.master_content_detail_id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetContentDetailManagementApiQuery,
    useLazyGetContentDetailManagementApiQuery,

    useCreateContentDetailManagementApiMutation,

    useUpdateContentDetailManagementApiMutation,

    useDeleteContentDetailManagementApiMutation,

    useUpdateStatusContentDetailManagementApiMutation,
} = contentDetailManagementService
