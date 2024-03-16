import { Common, DataResponse, ILoyaltyProduct, IRequestPaging } from "@/models"
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { useState } from "react"
import { StatusEnum } from "@/enums"
import { formatMoney } from "@/helpers/utilities"

interface LoyaltyProductListingProps {
    pagination: IRequestPaging
    data?: DataResponse<ILoyaltyProduct[]>
    loading?: boolean
    onDelete: (data: ILoyaltyProduct) => void
    onActionForm: (data: ILoyaltyProduct) => void
}

function LoyaltyProductListing(props: LoyaltyProductListingProps) {
    const { data, loading, pagination, onActionForm, onDelete } = props
    const [currentRecord, setCurrentRecord] = useState<ILoyaltyProduct>({})

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

    const columns: ColumnsType<ILoyaltyProduct> = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string, record: ILoyaltyProduct) => {
                return (
                    <span className="d-flex items-center gap-2">
                        <img width={50} height={50} src={record?.image} alt={value} />
                        <span className="line-clamp-2">{Common.renderData(value)}</span>
                    </span>
                )
            },
        },
        {
            title: "Stock",
            dataIndex: "available_stock",
            key: "available_stock",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (value: number) => {
                return <span>{Common.renderData(formatMoney(value))}</span>
            },
        },
        {
            title: "Point",
            dataIndex: "point",
            key: "point",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Redeemed",
            dataIndex: "number_redeemped",
            key: "number_redeemped",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Purchase price",
            dataIndex: "purchase_price",
            key: "purchase_price",
            render: (value: number) => {
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
            title: "Action",
            key: "id",
            fixed: "right",
            align: "center",
            width: "8%",
            render: (_, record: ILoyaltyProduct) => (
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

export default LoyaltyProductListing
