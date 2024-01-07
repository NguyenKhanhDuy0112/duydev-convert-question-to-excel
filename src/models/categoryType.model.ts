import { ICategory } from "./category.model"

export interface ICategoryType {
    id?: string
    name?: string
    category_id?: string
    name_localize?: string
    category?: ICategory
    sub_category?: ICategory
    sub_category_id?: string
    is_active?: boolean
    created_at?: Date | null
    updated_at?: Date | null
}
