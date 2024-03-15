//COMPONENTS
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"

//MODELS
import { ColumnsType } from "antd/es/table"
import { Common, DataResponse, ILoyaltyCategory, IRequestPaging } from "@/models"

//ICONS
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"

//HOOKS
import { useState } from "react"

//ENUMS
import { FormatDateEnum, StatusEnum } from "@/enums"
import moment from "moment"

interface LoyaltyProductCategoryListingProps {
    pagination: IRequestPaging
    data?: DataResponse<ILoyaltyCategory[]>
    loading?: boolean
    onDelete: (data: ILoyaltyCategory) => void
    onActionForm: (data: ILoyaltyCategory) => void
}

function LoyaltyProductCategoryListing(props: LoyaltyProductCategoryListingProps) {
    const { data, loading, pagination, onActionForm, onDelete } = props
    const [currentRecord, setCurrentRecord] = useState<ILoyaltyCategory>({})

    const items: MenuProps["items"] = [
        {
            label: <div onClick={() => onActionForm(currentRecord)}>Edit</div>,
            key: "0",
        },
        {
            label: <div onClick={() => onDelete({ ...currentRecord })}>Delete</div>,
            key: "3",
        },
    ]

    const columns: ColumnsType<ILoyaltyCategory> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Sorting",
            dataIndex: "sorting",
            key: "sorting",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Created Date",
            dataIndex: "created_at",
            key: "created_at",
            render: (value: Date) => {
                return <span>{moment(value).format(FormatDateEnum.Default)}</span>
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
            title: "Action",
            key: "id",
            fixed: "right",
            align: "center",
            width: "8%",
            render: (_, record: ILoyaltyCategory) => (
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
            <Row justify={"space-between"} gutter={[16, 16]}>
                <Col lg={{ span: 8 }} xs={{ span: 24 }} md={{ span: 12 }}>
                    <Input.Search type="primary" placeholder="Search by name" />
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 4 }} md={{ span: 6 }} xs={{ span: 24 }}>
                    <Button onClick={() => onActionForm({})} icon={<PlusOutlined />} className="w-100" type="primary">
                        Create New
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={"id"}
                loading={loading}
                scroll={{ x: "auto" }}
                dataSource={data?.data || []}
                pagination={{ current: pagination?.page, total: data?.total }}
            />
        </Space>
    )
}

export default LoyaltyProductCategoryListing
