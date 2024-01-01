import { DataResponse, ICategoryType, IRequestPaging } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const contentTypeService = createApi({
    reducerPath: "contentTypeService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getContentTypeApi: builder.query<DataResponse<ICategoryType[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/master-cat-type",
                params,
                method: "GET",
            }),
            transformResponse: (rawData: ICategoryType[]) => {
                return {
                    data: rawData,
                }
            },
        }),
        createContentTypeApi: builder.mutation<string, ICategoryType>({
            query: (body: ICategoryType) => ({
                url: "/master-cat-type",
                body,
                method: "POST",
            }),
        }),
        updateContentTypeApi: builder.mutation<string, ICategoryType>({
            query: (body: ICategoryType) => ({
                url: `/master-cat-type/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteContentTypeApi: builder.mutation<string, ICategoryType>({
            query: (body: ICategoryType) => ({
                url: `/master-cat-type/${body.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetContentTypeApiQuery,
    useLazyGetContentTypeApiQuery,

    useCreateContentTypeApiMutation,

    useUpdateContentTypeApiMutation,

    useDeleteContentTypeApiMutation,
} = contentTypeService
