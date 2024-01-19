import { AssetsImages } from "@/assets/images"

//MODELS
import { IContentDetail, IContentItem } from "@/models"

//ENUMS
import { LangCodeEnum } from "@/enums"

//HOOKS
import { useMemo, useState } from "react"

//SERVICES
import { useGetContentTypeManagementApiQuery } from "@/services/contentManagement.service"

//COMPONENTS
import { Badge, Button, Card, Dropdown, MenuProps } from "antd"
import ContentDetail from "../ContentDetail"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"

interface ContentProps {
    data?: IContentItem
    onDeleteContent: (data?: IContentItem) => void
    onEditContent: (data?: IContentItem) => void
    onEditContentDetail: (data?: IContentDetail[]) => void
    onDeleteContentDetail: (data: IContentDetail[]) => void
}

function Content(props: ContentProps) {
    const { data, onEditContent, onDeleteContent, onEditContentDetail, onDeleteContentDetail } = props

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
            text={contentTypes?.data?.find((item) => item?.id === displayContent?.type_id)?.name}
        >
            <Card
                className="card__content"
                title={
                    <div className="d-flex gap-4">
                        {displayContent?.name}
                        <div className="d-flex gap-2">
                            <img
                                onClick={() => setCurrentLang(LangCodeEnum.EN)}
                                width={25}
                                className="cursor-pointer"
                                src={AssetsImages.unitedStatesFlag}
                            />
                            <img
                                onClick={() => setCurrentLang(LangCodeEnum.VI)}
                                width={25}
                                className="cursor-pointer"
                                src={AssetsImages.vietnamFlag}
                            />
                        </div>
                    </div>
                }
                size="default"
                extra={
                    <Dropdown overlayClassName="dropdown-action-table" menu={{ items }} trigger={["click"]}>
                        <Button type="text" className="dot-menu-action">
                            <DotMenuIc />
                        </Button>
                    </Dropdown>
                }
            >
                <ContentDetail
                    master_content_id={data![LangCodeEnum.EN]?.master_content_id}
                    data={data?.items}
                    onActionForm={onEditContentDetail}
                    onDeleteContentDetail={onDeleteContentDetail}
                />
            </Card>
        </Badge.Ribbon>
    )
}

export default Content
