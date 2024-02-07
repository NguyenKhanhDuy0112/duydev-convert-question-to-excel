export interface ICategory {
    id?: string
    category_id?: string
    name?: string
    url_link?: string
    name_localize?: string
    project_id?: string
    cate_type_id?: string
    is_wait_approve?: boolean
    items?: ICategory[]
    subs?: ICategory[]
    is_active?: boolean
    slug?: string
    parent_slug?: string
    sorting?: number
    created_at?: Date | null
    updated_at?: Date | null
}

export interface ICategoryItem {
    id?: string
    name?: string
    name_localize?: string
    cate_type_id?: string
    url_link?: string
    is_active?: boolean
    sorting?: number
    created_at?: Date | null
    updated_at?: Date | null
}
