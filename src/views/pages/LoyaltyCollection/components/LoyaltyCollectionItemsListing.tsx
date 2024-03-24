//MODELS
import { Common, ILoyaltyCollectionItem, ILoyaltyProduct } from "@/models"
import { ColumnsType } from "antd/es/table"

//COMPONENTS
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"

//ICONS
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"

//HOOKS
import { useState } from "react"

//ENUMS
import { StatusEnum } from "@/enums"

interface LoyaltyCollectionItemsListingProps {
    data?: ILoyaltyCollectionItem[]
    loading?: boolean
    onDelete: (data: ILoyaltyCollectionItem) => void
    onActionForm: (data: ILoyaltyCollectionItem) => void
}

function LoyaltyCollectionItemsListing(props: LoyaltyCollectionItemsListingProps) {
    const { data, loading, onActionForm, onDelete } = props
    const [currentRecord, setCurrentRecord] = useState<ILoyaltyCollectionItem>({})

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

    const columns: ColumnsType<ILoyaltyCollectionItem> = [
        {
            title: "Product Name",
            dataIndex: "products",
            key: "products",
            render: (value: ILoyaltyProduct) => {
                return <span>{Common.renderData(value?.name)}</span>
            },
        },
        {
            title: "Point",
            dataIndex: "products",
            key: "products",
            render: (value: ILoyaltyProduct) => {
                return <span>{Common.renderData(value?.point)}</span>
            },
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (value: ILoyaltyCollectionItem) => {
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
            render: (_, record: ILoyaltyCollectionItem) => (
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
            <h3>Collection Items</h3>
            <Row justify={"space-between"} gutter={[16, 16]}>
                <Col lg={{ span: 8 }} xs={{ span: 24 }} md={{ span: 12 }}>
                    <Input.Search type="primary" placeholder="Search by name" />
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 4 }} md={{ span: 6 }} xs={{ span: 24 }}>
                    <Button onClick={() => onActionForm({})} icon={<PlusOutlined />} className="w-100" type="primary">
                        Add Products
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={"id"}
                loading={loading}
                scroll={{ x: "auto" }}
                dataSource={data || []}
                // pagination={{ current: pagination?.page, total: data?.total, pageSize: pagination?.limit }}
            />
        </Space>
    )
}

export default LoyaltyCollectionItemsListing
