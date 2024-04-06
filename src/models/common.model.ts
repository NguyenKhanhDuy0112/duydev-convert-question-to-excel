import { AnswerTypeEnum, ContentStatusEnum } from "@/enums"

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

export class GenerateQuestionAnswerTemplate {
    static categoryName: string = ""
    static indexFile: string = ""
    public static generateAnswerTemplate(
        typeAnwser: AnswerTypeEnum,
        answers: any,
        question: string,
        correctAnswer: number[]
    ) {
        switch (typeAnwser) {
            case AnswerTypeEnum.TrueFalse:
                return {
                    title: question?.trim(),
                    isMultipleChoice: 0,
                    questionAnswerTemplates: `[{"title"":""True"",""isCorrect"":""${
                        correctAnswer?.includes(0) ? false : true
                    }"}, {"title"":""False"",""isCorrect"":""${correctAnswer?.includes(0) ? true : false}"}]`,
                    category: this.categoryName?.trim(),
                }
            case AnswerTypeEnum.MultipleChoice:
                return {
                    title: question?.trim(),
                    isMultipleChoice: 1,
                    questionAnswerTemplates: JSON.stringify(
                        answers?.map((item: any, index: number) => {
                            return {
                                title: item?.trim(),
                                isCorrect: String(correctAnswer?.includes(index + 1)),
                            }
                        })
                    ),
                    category: this.categoryName?.trim(),
                }
            case AnswerTypeEnum.Normal:
                return {
                    title: question?.trim(),
                    isMultipleChoice: 0,
                    questionAnswerTemplates: JSON.stringify(
                        answers?.map((item: any, index: number) => {
                            return {
                                title: item?.trim(),
                                isCorrect: String(correctAnswer?.includes(index + 1)),
                            }
                        })
                    ),
                    category: this.categoryName?.trim(),
                }
        }
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

export interface IRecordQuestion {
    title: string
    isMultipleChoice: boolean
    questionAnswerTemplates: any
}
