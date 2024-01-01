export interface ICategory {
    id?: string
    name?: string
    url_link?: string
    project_id?: string
    cate_type_id?: string
    items?: ICategoryItem[]
    subs?: ICategoryItem[]
    is_active?: boolean
    sorting?: number
    created_at?: Date | null
    updated_at?: Date | null
}

export interface ICategoryItem {
    id?: string
    name?: string
    cate_type_id?: string
    url_link?: string
    is_active?: boolean
    sorting?: number
    created_at?: Date | null
    updated_at?: Date | null
}
