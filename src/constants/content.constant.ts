import { ContentStatusEnum } from "@/enums"

export const CONTENT_STATUS_OPTIONS = [
    { value: ContentStatusEnum.APPROVED, label: "Approved" },
    { value: ContentStatusEnum.REJECTED, label: "Rejected" },
    { value: ContentStatusEnum.WAITING, label: "Waiting" },
]
