import { DataResponse, ICategory, ILanguage } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const commonService = createApi({
    reducerPath: "commonService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postClearCacheApi: builder.mutation<void, void>({
            query: () => ({
                url: "/common/clear-cache",
                method: "POST",
            }),
        }),
        postClearCacheFOApi: builder.mutation<void, void>({
            query: () => ({
                url: "/common/clear-cache-fo",
                method: "POST",
            }),
        }),
        getLanguagesApi: builder.query<DataResponse<ILanguage[]>, { project_id: string }>({
            query: (params) => ({
                url: "/common/language",
                params,
                method: "GET",
            }),
            transformResponse: (response: ILanguage[]) => ({
                data: response,
            }),
        }),
    }),
})

export const { usePostClearCacheApiMutation, usePostClearCacheFOApiMutation, useGetLanguagesApiQuery } = commonService
