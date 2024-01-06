import { DataResponse, IContentDetailForm, IMedia } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const mediaService = createApi({
    reducerPath: "mediaService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getMediaApi: builder.query<DataResponse<IMedia[]>, void>({
            query: () => ({
                url: `/media`,
                method: "GET",
            }),
            transformResponse: (response: IMedia[]) => {
                return {
                    data: response,
                }
            },
        }),
        createMediaApi: builder.mutation<any, any>({
            query: (body: IContentDetailForm) => ({
                url: "/media",
                body,
                method: "POST",
            }),
        }),
    }),
})

export const {
    useGetMediaApiQuery,
    useLazyGetMediaApiQuery,

    useCreateMediaApiMutation,
} = mediaService
