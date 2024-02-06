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
        return { color, className }
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
