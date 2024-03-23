import { Common, DataResponse, ILoyaltyCollection, IRequestPaging } from "@/models"
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { useState } from "react"
import { FormatDateEnum, StatusEnum } from "@/enums"
import moment from "moment"

interface LoyaltyCollectionListingProps {
    pagination: IRequestPaging
    data?: DataResponse<ILoyaltyCollection[]>
    loading?: boolean
    onDelete: (data: ILoyaltyCollection) => void
    onActionForm: (data: ILoyaltyCollection) => void
    onPagination: (pagination: TablePaginationConfig) => void
}

function LoyaltyCollectionListing(props: LoyaltyCollectionListingProps) {
    const { data, loading, pagination, onActionForm, onPagination, onDelete } = props
    const [currentRecord, setCurrentRecord] = useState<ILoyaltyCollection>({})

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

    const columns: ColumnsType<ILoyaltyCollection> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Collection Type",
            dataIndex: "collection_type",
            key: "collection_type",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Effective Date Start",
            dataIndex: "effective_date_start",
            key: "effective_date_start",
            render: (value: Date) => {
                return <span>{moment(value).format(FormatDateEnum.Default)}</span>
            },
        },
        {
            title: "Effective Date End",
            dataIndex: "effective_date_end",
            key: "effective_date_end",
            render: (value: Date) => {
                return <span>{moment(value).format(FormatDateEnum.Default)}</span>
            },
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (value: ILoyaltyCollection) => {
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
            render: (_, record: ILoyaltyCollection) => (
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
                pagination={{ current: pagination?.page, total: data?.total, pageSize: pagination?.limit }}
                onChange={onPagination}
            />
        </Space>
    )
}

export default LoyaltyCollectionListing
