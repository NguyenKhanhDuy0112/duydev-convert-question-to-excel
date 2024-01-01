import { LangCodeEnum } from "@/enums"
import { IContentDetailList } from "./contentDetail.model"

export interface IContent {
    name: string
    description: string
    image: string
    lang: string
    position?: number
    is_default: boolean
    is_active?: boolean
    type_id: string
    cate_type_id: string
    master_content_id?: string
    created_at?: Date | null
    updated_at?: Date | null
}

export interface IContentForm {
    items: IContent[]
    cate_type_id: string
    type_id: string
    master_content_id?: string
}

export interface IContentItem {
    [LangCodeEnum.EN]?: IContent
    [LangCodeEnum.VI]?: IContent
    items?: IContentDetailList
}

export interface IContentList {
    [key: string]: IContentItem
}
