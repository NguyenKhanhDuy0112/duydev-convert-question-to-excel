import { ContentStatusEnum } from "@/enums"
import { IContentType } from "./contentType.model"

export interface IContentDetail {
    id?: string
    name?: string
    title?: string
    sub_title?: string
    content?: string
    sub_content?: string
    image?: string
    lang?: string
    is_default?: boolean
    created_at?: Date | null
    updated_at?: Date | null
    is_active?: boolean
    position?: number
    approve_by?: string
    deleted_by?: string
    type?: IContentType
    status?: ContentStatusEnum
    master_content_detail_id?: string
    master_content_id?: string
}

export interface IContentDetailList {
    [key: string]: IContentDetail[]
}

export interface IContentDetailForm {
    items: IContentDetail[]
    status?: ContentStatusEnum
    master_content_id?: string
    master_content_detail_id?: string
}
