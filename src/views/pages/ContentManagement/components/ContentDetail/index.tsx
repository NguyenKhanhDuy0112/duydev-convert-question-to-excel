//MODELS
import { Common, IContentDetail, IContentDetailList } from "@/models"

//HOOKS
import { useMemo } from "react"

//ENUMS
import { LangCodeEnum } from "@/enums"

//ICONS
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { PlusOutlined } from "@ant-design/icons"

//COMPONENTS
import { Button, Dropdown, Table } from "antd"
import { AssetsImages } from "@/assets/images"

interface ContentDetailProps {
    master_content_id?: string
    data?: IContentDetailList
    onActionForm: (data?: IContentDetail[], master_content_id?: string) => void
    onDeleteContentDetail: (data: IContentDetail[]) => void
}

function ContentDetail(props: ContentDetailProps) {
    const { data, master_content_id, onDeleteContentDetail, onActionForm } = props

    const columns: any = useMemo(() => {
        return [
            {
                title: "Title",
                dataIndex: "title",
                key: "title",
                render: (value: string) => {
                    return <span>{Common.renderData(value)}</span>
                },
            },
            {
                title: "Sub title",
                dataIndex: "sub_title",
                key: "sub_title",
                render: (value: string) => {
                    return <span>{Common.renderData(value)}</span>
                },
            },
            {
                title: "Languages",
                dataIndex: "sub_title",
                key: "sub_title",
                render: (value: string, record: any) => {
                    return (
                        <div className="d-flex gap-2 items-center">
                            {record?.data?.map((item: IContentDetail) => (
                                <img
                                    width={25}
                                    src={
                                        item?.lang === LangCodeEnum.VI
                                            ? AssetsImages.vietnamFlag
                                            : AssetsImages.unitedStatesFlag
                                    }
                                />
                            ))}
                        </div>
                    )
                },
            },
            {
                title: "Action",
                key: "id",
                align: "center",
                fixed: "right",
                width: "8%",
                render: (_: any, record: any) => (
                    <Dropdown
                        overlayClassName="dropdown-action-table"
                        menu={{
                            items: [
                                {
                                    label: (
                                        <div onClick={() => onActionForm(record?.data, master_content_id)}>Edit</div>
                                    ),
                                    key: "0",
                                },
                                {
                                    label: <div onClick={() => onDeleteContentDetail(record?.data)}>Delete</div>,
                                    key: "3",
                                },
                            ],
                        }}
                        trigger={["click"]}
                    >
                        <Button type="text" className="dot-menu-action">
                            <DotMenuIc />
                        </Button>
                    </Dropdown>
                ),
            },
        ]
    }, [])

    return (
        <>
            <div className="d-flex justify-end m-b-4">
                <Button icon={<PlusOutlined />} onClick={() => onActionForm([], master_content_id)} type="primary">
                    Create New
                </Button>
            </div>
            <Table
                columns={columns}
                rowKey={"id"}
                scroll={{ x: 1000 }}
                dataSource={Object.keys(data || {})?.map((item) => ({
                    ...data![item]?.find((el) => el?.lang === LangCodeEnum.EN),
                    data: data![item],
                    master_content_detail_id: data![item]?.find((el) => el?.lang === LangCodeEnum.EN)?.id,
                }))}
                loading={false}
                pagination={false}
            />
        </>
    )
}

export default ContentDetail
