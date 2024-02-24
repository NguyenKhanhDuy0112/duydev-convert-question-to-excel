import { ContentStatusEnum } from "@/enums"

export class Common {
    public static renderData(data: any) {
        return data ? data : "N/A"
    }
    public static getColorTagContentByStatus(status: ContentStatusEnum) {
        let color = ""
        let className = `tag-${status}`

        switch (status) {
            case ContentStatusEnum.APPROVED:
                color = "green-inverse"
                break
            case ContentStatusEnum.WAITING:
                color = "ogrange-inverse"
                break
            case ContentStatusEnum.REJECTED:
                color = "red-inverse"
                break
        }
        return { color, className, name: status }
    }
}

export interface IRequestPaging {
    page?: number
    limit?: number
    search?: string
    project_id?: string
}

export type DataResponse<T> = {
    data?: T
    page?: number
    total?: number
    success?: boolean
    friendly_message?: string
    message?: string
    status?: number
}

export interface SelectOption {
    label: string
    value: string
}

export interface ILanguage {
    id?: string
    name?: string
    locale?: string
    project_id?: string
    iso_code?: string
    image?: string
    is_active?: boolean
    created_at?: Date | null
    updated_at?: Date | null
}

export interface ICommonStore {
    languages: ILanguage[]
}
