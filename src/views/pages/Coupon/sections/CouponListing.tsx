import { Common, DataResponse, ICategory, ICoupon, IRequestPaging } from "@/models"
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { PlusOutlined } from "@ant-design/icons"
import moment from "moment"

import { ReactComponent as DotMenuIc } from "@/assets/icons/dots_menu_icon.svg"
import { replaceHttps } from "@/helpers/utilities"
import { FormatDateEnum } from "@/enums"
import { useState } from "react"

interface CouponListingProps {
    isLoading?: boolean
    data?: DataResponse<ICoupon[]>
    onDelete: (data?: ICoupon) => void
    onActionForm: (value?: ICoupon) => void
    pagination?: IRequestPaging
}

function CouponListing(props: CouponListingProps) {
    const { data, isLoading, pagination, onActionForm, onDelete } = props

    //STATES
    const [currentRecord, setCurrentRecord] = useState<ICoupon>({})

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

    const columns: ColumnsType<ICoupon> = [
        {
            title: "Sorting",
            dataIndex: "sorting",
            key: "sorting",
            render: (value: number) => {
                return <span>{Common.renderData(`${value}`)}</span>
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Currency code",
            dataIndex: "currency_code",
            key: "currency_code",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Prefix",
            dataIndex: "prefix",
            key: "prefix",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            render: (value: string) => {
                return value ? (
                    <a href={value} target="_blank" rel="noreferrer">
                        {replaceHttps(value)}
                    </a>
                ) : (
                    Common.renderData(value)
                )
            },
        },
        {
            title: "Expiration date",
            dataIndex: "expired_at",
            key: "expired_at",
            render: (value: Date | null) => {
                return moment(value).format(FormatDateEnum.Default)
            },
        },
        {
            title: "Action",
            key: "id",
            align: "center",
            width: "5%",
            render: (_, record: ICoupon) => (
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
                loading={isLoading}
                dataSource={data?.data || []}
                pagination={{ current: pagination?.page, total: data?.total, pageSize: pagination?.limit }}
            />
        </Space>
    )
}

export default CouponListing
