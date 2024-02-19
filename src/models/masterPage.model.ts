import { ContentStatusEnum, MasterCateEnum } from "@/enums"
import { IContent } from "./content.model"

export interface IMasterPage {
    id?: string
    name?: string
    name_localize?: string
    route?: string
    project_id?: string
    status?: ContentStatusEnum
    is_wait_approve?: boolean
}

export interface IMasterPageForm extends IMasterPage {
    items?: IContent[]
    cate_type_id?: string
    type_id?: string
    status?: ContentStatusEnum
    master_type?: MasterCateEnum
    master_content_id?: string
}
