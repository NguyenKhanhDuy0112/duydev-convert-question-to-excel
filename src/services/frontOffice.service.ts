import { IFormLogin } from "@/models"
import { baseQueryFO } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const frontOfficeService = createApi({
    reducerPath: "frontOfficeService",
    baseQuery: baseQueryFO,
    endpoints: (builder) => ({
        postClearCacheFrontOfficeApi: builder.mutation<void, void>({
            query: () => ({
                url: "/revalidate",
                method: "POST",
            }),
        }),
    }),
})

export const { usePostClearCacheFrontOfficeApiMutation } = frontOfficeService
