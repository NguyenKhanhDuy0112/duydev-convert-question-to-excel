//MODELS
import { Common, DataResponse, ICategoryType, ICoupon, ICouponLang, ICouponType, IRequestPaging } from "@/models"

//UTILITIES
import moment from "moment"

//HOOKS
import { useState } from "react"

//MODELS
import { ColumnsType, TablePaginationConfig } from "antd/es/table"

//ENUMS
import { CouponTypeEnum, FormatDateEnum, LangCodeEnum } from "@/enums"

//ICONS
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"

//COMPONENTS
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"

interface CouponListingProps {
    isLoading?: boolean
    data?: DataResponse<ICoupon[]>
    onDelete: (data?: ICoupon) => void
    onActionForm: (value?: ICoupon) => void
    pagination?: IRequestPaging
    onPagination: (pagination: TablePaginationConfig) => void
}

function CouponListing(props: CouponListingProps) {
    const { data, isLoading, pagination, onActionForm, onDelete, onPagination } = props

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
            dataIndex: "langs",
            key: "langs",
            render: (value: ICouponLang[]) => {
                return <span>{Common.renderData(value?.find((item) => item?.lang === LangCodeEnum.EN)?.name)}</span>
            },
        },
        {
            title: "Type",
            dataIndex: "aCouponType",
            key: "aCouponType",
            render: (value: ICouponType) => {
                return (
                    <Tag color={value?.name === CouponTypeEnum.CODE ? "green-inverse" : "orange-inverse"}>
                        {Common.renderData(value?.name?.toUpperCase())}
                    </Tag>
                )
            },
        },
        {
            title: "Category type",
            dataIndex: "cate_types",
            key: "cate_types",
            render: (value: ICategoryType[]) => {
                //how to random colors
                const colors = ["blue", "green", "yellow", "purple", "orange", "pink", "black", "white", "brown"]
                return (
                    <Row gutter={[6, 6]}>
                        {value?.map((item, index) => {
                            let randomColor
                            if (colors[index]) {
                                randomColor = colors[index]
                            } else {
                                randomColor = colors[Math.floor(Math.random() * colors.length)]
                            }
                            return (
                                <Col>
                                    <Tag color={randomColor}>{Common.renderData(item.name)}</Tag>
                                </Col>
                            )
                        })}
                    </Row>
                )
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
            title: "Expiration date",
            dataIndex: "expire_date",
            key: "expire_date",
            render: (value: Date | null) => {
                return moment(value).format(FormatDateEnum.Default)
            },
        },
        {
            title: "Action",
            key: "id",
            align: "center",
            fixed: "right",
            width: "10%",
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
            <Row justify={"space-between"} gutter={[16, 16]}>
                <Col lg={{ span: 8 }} xs={{ span: 24 }} md={{ span: 12 }}>
                    <Input.Search type="primary" placeholder="Search..." />
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
                loading={isLoading}
                scroll={{ x: "auto" }}
                dataSource={data?.data || []}
                pagination={{ current: pagination?.page, total: data?.total, pageSize: pagination?.limit }}
                onChange={(pagination) => onPagination(pagination)}
            />
        </Space>
    )
}

export default CouponListing
