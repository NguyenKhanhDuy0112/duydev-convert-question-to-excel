import { LangCodeEnum, RelEnum } from "@/enums"
import { ProjectIDs } from "./project.constant"

export const INIT_PAGINATION = {
    page: 1,
    limit: 10,
    search: "",
    lang: LangCodeEnum.VI,
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

export const REL_OPTIONS = [
    {
        label: RelEnum.CANONICAL,
        value: RelEnum.CANONICAL,
    },
    {
        label: RelEnum.DO_FOLLOW,
        value: RelEnum.DO_FOLLOW,
    },
    {
        label: RelEnum.NO_FOLLOW,
        value: RelEnum.NO_FOLLOW,
    },
]
