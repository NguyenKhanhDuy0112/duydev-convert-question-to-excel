import { LangCodeEnum } from "@/enums"
import { ProjectIDs } from "./project.constant"

export const INIT_PAGINATION = {
    page: 1,
    limit: 10,
    search: "",
    project_id: ProjectIDs.Project_1,
}

export const TAB_LANGS = [
    {
        label: "English",
        value: LangCodeEnum.EN,
    },
    {
        label: "Vietnamese",
        value: LangCodeEnum.VI,
    },
]
