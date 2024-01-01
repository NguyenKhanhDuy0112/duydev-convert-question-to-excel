import { CouponTypeEnum, StatusCoupon } from "@/enums"
import React from "react"

export interface ICoupon {
    id?: string
    name?: string
    code?: string
    discount?: number
    currency_code?: string
    is_coupon?: boolean
    link?: string
    description?: string
    prefix?: StatusCoupon
    sub_category_id?: string
    coupon_type_id?: string
    sorting?: number
    image?: string
    is_verify?: boolean
    created_at?: Date | null
    updated_at?: Date | null
    expired_at?: Date | null
    expire_date?: Date | null
    cate_types?: React.Key[]
}

export interface ICouponType {
    id?: string
    name?: CouponTypeEnum
    description?: string
    created_at?: Date | null
    updated_at?: Date | null
}
