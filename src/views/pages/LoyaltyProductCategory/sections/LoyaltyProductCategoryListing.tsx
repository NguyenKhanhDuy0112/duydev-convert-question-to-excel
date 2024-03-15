//COMPONENTS
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"

//MODELS
import { ColumnsType } from "antd/es/table"
import { Common, DataResponse, IRequestPaging, IUser } from "@/models"

//ICONS
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"

//HOOKS
import { useState } from "react"

//ENUMS
import { StatusEnum } from "@/enums"

interface LoyaltyProductListingProps {
    pagination: IRequestPaging
    data?: DataResponse<IUser[]>
    loading?: boolean
    onDelete: (data: IUser) => void
    onActionForm: (data: IUser) => void
    onResetPassword: (data: IUser) => void
    onSetStatusUser: (data: IUser) => void
}

function LoyaltyProductListing(props: LoyaltyProductListingProps) {
    const { data, loading, pagination, onActionForm, onDelete, onSetStatusUser, onResetPassword } = props
    const [currentRecord, setCurrentRecord] = useState<IUser>({})

    const items: MenuProps["items"] = [
        {
            label: <div onClick={() => onActionForm(currentRecord)}>Edit</div>,
            key: "0",
        },
        {
            label: (
                <div onClick={() => onSetStatusUser({ ...currentRecord, is_active: !currentRecord?.is_active })}>
                    {currentRecord?.is_active ? StatusEnum.Deactivated : StatusEnum.Activated}
                </div>
            ),
            key: "1",
        },
        {
            label: <div onClick={() => onResetPassword(currentRecord)}>Reset password</div>,
            key: "2",
        },
        {
            label: <div onClick={() => onDelete({ ...currentRecord })}>Delete</div>,
            key: "3",
        },
    ]

    const columns: ColumnsType<IUser> = [
        {
            title: "First name",
            dataIndex: "first_name",
            key: "first_name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Last name",
            dataIndex: "last_name",
            key: "last_name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Phone number",
            dataIndex: "phone",
            key: "phone",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "User type",
            dataIndex: "uUserGroup",
            key: "uUserGroup",
            render: (_, record: IUser) => {
                return (
                    <div>
                        {record?.uUserGroup?.map((item, index) => {
                            return (
                                <Tag color="" className="m-1" key={index}>
                                    {Common.renderData(item?.uGroups?.name)}
                                </Tag>
                            )
                        })}
                    </div>
                )
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
            render: (_, record: IUser) => (
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
