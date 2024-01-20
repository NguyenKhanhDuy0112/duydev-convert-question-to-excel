import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

//MODELS
import { DataResponse, ICategory, IRequestPaging } from "@/models"
import { IMasterPage } from "@/models/masterPage.model"

export const masterPageService = createApi({
    reducerPath: "masterPageService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getMasterPagesApi: builder.query<DataResponse<IMasterPage[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/page",
                params,
                method: "GET",
            }),
        }),
        createMasterPageApi: builder.mutation<IMasterPage, IMasterPage>({
            query: (body: ICategory) => ({
                url: "/page",
                body,
                method: "POST",
            }),
        }),
        updateMasterPageApi: builder.mutation<IMasterPage, IMasterPage>({
            query: (body: ICategory) => ({
                url: `/page/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteMasterPageApi: builder.mutation<IMasterPage, IMasterPage>({
            query: (body: ICategory) => ({
                url: `/page/${body.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetMasterPagesApiQuery,
    useLazyGetMasterPagesApiQuery,

    useCreateMasterPageApiMutation,
    useUpdateMasterPageApiMutation,
    useDeleteMasterPageApiMutation,
} = masterPageService
