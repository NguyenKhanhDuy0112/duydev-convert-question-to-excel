export class Common {
    public static renderData(data: any) {
        return data ? data : "N/A"
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
