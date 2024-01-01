import { DataResponse, ICategory, ICoupon, ICouponType, IRequestPaging } from "@/models"
import { baseQuery } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const couponService = createApi({
    reducerPath: "couponService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getCouponsApi: builder.query<DataResponse<ICoupon[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/coupon",
                params,
                method: "GET",
            }),
        }),
        getCouponsTypeApi: builder.query<DataResponse<ICouponType[]>, void>({
            query: () => ({
                url: "/coupon/coupon-type",
                method: "GET",
            }),
            transformResponse: (rawData: ICouponType[]) => {
                return {
                    data: rawData,
                }
            },
        }),
        createCouponApi: builder.mutation<string, ICoupon>({
            query: (body: ICategory) => ({
                url: "/coupon",
                body,
                method: "POST",
            }),
        }),
        updateCouponApi: builder.mutation<string, ICoupon>({
            query: (body: ICategory) => ({
                url: `/coupon/${body?.id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteCouponApi: builder.mutation<string, ICoupon>({
            query: (body: ICategory) => ({
                url: `/coupon/${body.id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetCouponsApiQuery,
    useLazyGetCouponsApiQuery,

    useGetCouponsTypeApiQuery,

    useCreateCouponApiMutation,

    useUpdateCouponApiMutation,

    useDeleteCouponApiMutation,
} = couponService
