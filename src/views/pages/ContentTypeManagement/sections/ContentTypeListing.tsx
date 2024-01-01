import { Common, DataResponse, ICategoryType, IRequestPaging } from "@/models"
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { PlusOutlined } from "@ant-design/icons"
import moment from "moment"

import { ReactComponent as DotMenuIc } from "@/assets/icons/dots_menu_icon.svg"
import { FormatDateEnum, StatusEnum } from "@/enums"
import { useState } from "react"

interface CouponListingProps {
    data?: DataResponse<ICategoryType[]>
    onDelete: (data?: ICategoryType) => void
    onActionForm: (value?: ICategoryType) => void
    pagination?: IRequestPaging
}

function ContentTypeListing(props: CouponListingProps) {
    const { data, pagination, onActionForm, onDelete } = props

    //STATES
    const [currentRecord, setCurrentRecord] = useState<ICategoryType>({})

    const items: MenuProps["items"] = [
        {
            label: <div onClick={() => onActionForm(currentRecord)}>Edit</div>,
            key: "0",
        },
        {
            label: <div onClick={() => onDelete(currentRecord)}>Delete</div>,
            key: "1",
        },
    ]

    const columns: ColumnsType<ICategoryType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Category",
            dataIndex: "category_id",
            key: "category_id",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Sub Category",
            dataIndex: "sub_category_id",
            key: "sub_category_id",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (value: boolean) => {
                return (
                    <Tag color={value ? "green-inverse" : "red-inverse"}>
                        {value ? StatusEnum.Activated : StatusEnum.Deactivated}
                    </Tag>
                )
            },
        },

        {
            title: "Created at",
            dataIndex: "created_at",
            key: "created_at",
            render: (value: Date | null) => {
                return moment(value).format(FormatDateEnum.Default)
            },
        },
        {
            title: "Action",
            key: "id",
            align: "center",
            width: "5%",
            render: (_, record: ICategoryType) => (
                <Dropdown overlayClassName="dropdown-action-table" menu={{ items }} trigger={["click"]}>
                    <Button onClick={() => setCurrentRecord(record)} type="text" className="dot-menu-action">
                        <DotMenuIc />
                    </Button>
                </Dropdown>
            ),
        },
    ]

    return (
        <Space direction="vertical" size={"large"}>
            <Row justify={"space-between"}>
                <Col span={6}>
                    <Input.Search type="primary" placeholder="Search by name" />
                </Col>
                <Col xl={{ span: 3 }} lg={{ span: 4 }} xs={{ span: 6 }}>
                    <Button onClick={() => onActionForm({})} icon={<PlusOutlined />} className="w-100" type="primary">
                        Create New
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={"id"}
                dataSource={data?.data || []}
                pagination={{ current: pagination?.page, total: data?.total, pageSize: pagination?.limit }}
            />
        </Space>
    )
}

export default ContentTypeListing
