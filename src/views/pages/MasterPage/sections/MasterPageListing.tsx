//HOOKS
import { useState } from "react"

//UTILITIES
import moment from "moment"

//MODELS
import { Common, DataResponse, ICategoryType, IMasterPage, IRequestPaging } from "@/models"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"

//ENUMS
import { ContentStatusEnum, FormatDateEnum } from "@/enums"

//ICONS
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { PlusOutlined } from "@ant-design/icons"

//COMPONENTS
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"

interface MasterCenterListingProps {
    data?: DataResponse<IMasterPage[]>
    loading?: boolean
    onDelete: (data?: IMasterPage) => void
    onActionForm: (value?: IMasterPage) => void
    onPagination: (pagination: TablePaginationConfig) => void
    pagination?: IRequestPaging
}

function MasterPageListing(props: MasterCenterListingProps) {
    const { data, pagination, loading, onActionForm, onDelete, onPagination } = props

    //STATES
    const [currentRecord, setCurrentRecord] = useState<IMasterPage>({})

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

    const columns: ColumnsType<IMasterPage> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Localise",
            dataIndex: "name_localize",
            key: "name_localize",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Route",
            dataIndex: "route",
            key: "route",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Status",
            dataIndex: "is_wait_approve",
            key: "is_wait_approve",
            render: (value: boolean) => {
                const status = Common.getColorTagContentByStatus(
                    value ? ContentStatusEnum.WAITING : ContentStatusEnum.APPROVED
                )
                return (
                    <Tag color={status?.color} className={status?.className}>
                        {status?.name}
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
            fixed: "right",
            align: "center",
            width: "8%",
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
            <Row justify={"space-between"} gutter={[16, 16]}>
                <Col lg={{ span: 8 }} xs={{ span: 24 }} md={{ span: 12 }}>
                    <Input.Search type="primary" placeholder="Search category" />
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
                dataSource={data?.data || []}
                scroll={{ x: "auto" }}
                pagination={{ total: data?.total, pageSize: pagination?.limit, current: data?.page }}
                onChange={(pagination) => onPagination(pagination)}
            />
        </Space>
    )
}

export default MasterPageListing
