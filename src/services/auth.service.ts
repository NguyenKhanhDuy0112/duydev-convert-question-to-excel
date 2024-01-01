import { IFormLogin, IFormResponseLogin } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const authService = createApi({
    reducerPath: "authService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        loginApi: builder.mutation<IFormResponseLogin, IFormLogin>({
            query: (body: IFormLogin) => ({
                url: "/auth/login",
                body,
                method: "POST",
            }),
        }),
    }),
})

export const { useLoginApiMutation } = authService
