import { ILoyaltyProduct } from "./loyaltyProduct.model"

export interface ILoyaltyCollection {
    id?: string
    tag_id?: string
    name?: string
    description?: string
    is_active?: boolean
    effective_date?: [Date, Date]
    effective_date_start?: Date | null
    effective_date_end?: Date | null
    collection_type?: string
    productCollectionItem?: ILoyaltyCollectionItem[]
    created_by?: string
    updated_by?: string
    updated_at?: Date | null
    created_at?: Date | null
}

export interface ILoyaltyCollectionItem {
    id?: string
    product_id?: string
    product_collection_id?: string
    price?: number
    stock?: number
    sorting?: number
    is_active?: boolean
    products?: ILoyaltyProduct
    created_by?: string
    updated_by?: string
    updated_at?: Date | null
    created_at?: Date | null
}
