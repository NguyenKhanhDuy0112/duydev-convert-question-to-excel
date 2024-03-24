import { IAutoRunMemberTagRequest } from "@/models"
import { baseQueryLoyaltyBO } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const autoRunService = createApi({
    reducerPath: "autoRunService",
    baseQuery: baseQueryLoyaltyBO,
    endpoints: (builder) => ({
        autoRunMemberTagApi: builder.mutation<string, IAutoRunMemberTagRequest>({
            query: (body: IAutoRunMemberTagRequest) => ({
                url: "/auto-run/member-tag",
                body,
                method: "POST",
            }),
        }),
    }),
})

export const { useAutoRunMemberTagApiMutation } = autoRunService
