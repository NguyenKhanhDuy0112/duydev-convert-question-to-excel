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
    }),
})

export const { usePostClearCacheApiMutation } = commonService
