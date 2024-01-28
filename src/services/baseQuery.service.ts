import { CookieStorageKey, env } from "@/constants"
import { cookiesStorage } from "@/helpers/cookieStorage"
import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

export const baseQuery = fetchBaseQuery({
    baseUrl: `${env.API_BO_ENDPOINT}/ali-service-api`,
    prepareHeaders: (headers) => {
        const token = cookiesStorage.get(CookieStorageKey.ACCESS_TOKEN)
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
    cache: "no-cache",
    fetchFn(input: any, init: any) {
        return fetch(input, init).then((response: any) => {
            if (response.status === 401) {
                cookiesStorage.remove(CookieStorageKey.ACCESS_TOKEN)
                window.location.href = `/login`
            }
            return response
        })
    },
})

export const baseQueryFO = fetchBaseQuery({
    baseUrl: `${env.FO_URL}/api`,
    prepareHeaders: (headers) => {
        const token = cookiesStorage.get(CookieStorageKey.ACCESS_TOKEN)
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
            headers.set("X-API-KEY", env.FO_X_API_KEY)
        }
        return headers
    },
    cache: "no-cache",
    fetchFn(input: any, init: any) {
        return fetch(input, init).then((response: any) => {
            if (response.status === 401) {
                cookiesStorage.remove(CookieStorageKey.ACCESS_TOKEN)
                window.location.href = `/login`
            }
            return response
        })
    },
})

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions)
    // if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    //   window.location.href = "/";
    // }
    return result
}
