import { AssetsImages } from "@/assets/images"

//MODELS
import { Common, IContent, IContentDetail, IContentItem } from "@/models"

//ENUMS
import { ContentStatusEnum, LangCodeEnum } from "@/enums"

//HOOKS
import { useMemo, useState } from "react"

//SERVICES
import { useGetContentTypeManagementApiQuery } from "@/services/contentManagement.service"

//COMPONENTS
import { Badge, Button, Card, Dropdown, MenuProps, Select, Tag } from "antd"
import ContentDetail from "../ContentDetail"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { CONTENT_STATUS_OPTIONS } from "@/constants"

interface ContentProps {
    data?: IContentItem
    onDeleteContent: (data?: IContentItem) => void
    onEditContent: (data?: IContentItem) => void
    onChangeStatusContent: (status: ContentStatusEnum, record?: IContent) => void
    onEditContentDetail: (data?: IContentDetail[]) => void
    onDeleteContentDetail: (data: IContentDetail[]) => void
    onChangeStatusContentDetail: (status: ContentStatusEnum, record?: IContentDetail) => void
}

function Content(props: ContentProps) {
    const {
        data,
        onEditContent,
        onDeleteContent,
        onEditContentDetail,
        onDeleteContentDetail,
        onChangeStatusContentDetail,
    } = props

    const [currentLang, setCurrentLang] = useState<LangCodeEnum>(LangCodeEnum.EN)

    //SERVICES
    const { data: contentTypes } = useGetContentTypeManagementApiQuery()

    const displayContent = useMemo(() => {
        return data![currentLang]
    }, [data, currentLang])

    const items = useMemo<MenuProps["items"]>(() => {
        return [
            {
                label: <div onClick={() => onEditContent(data)}>Edit</div>,
                key: "0",
            },
            {
                label: <div onClick={() => onDeleteContent(data)}>Delete</div>,
                key: "3",
            },
        ]
    }, [])

    return (
        <Badge.Ribbon
            placement="start"
            text={
                <div className="">
                    <span>{contentTypes?.data?.find((item) => item?.id === displayContent?.type_id)?.name}</span>
                    <Tag
                        className={`m-1 ${
                            Common.getColorTagContentByStatus(displayContent?.status as ContentStatusEnum)?.className
                        }`}
                        color={Common.getColorTagContentByStatus(displayContent?.status as ContentStatusEnum)?.color}
                    >
                        {displayContent?.status}
                    </Tag>
                </div>
            }
        >
            <Card
                className={`card__content`}
                title={displayContent?.name}
                size="default"
                extra={
                    <>
                        <Dropdown overlayClassName="dropdown-action-table" menu={{ items }} trigger={["click"]}>
                            <Button type="text" className="dot-menu-action">
                                <DotMenuIc />
                            </Button>
                        </Dropdown>
                    </>
                }
            >
                <ContentDetail
                    master_content_id={data![LangCodeEnum.EN]?.master_content_id}
                    data={data?.items}
                    onActionForm={onEditContentDetail}
                    onDeleteContentDetail={onDeleteContentDetail}
                    onChangeStatus={onChangeStatusContentDetail}
                />
            </Card>
        </Badge.Ribbon>
    )
}

export default Content
