import { Common, DataResponse, IRequestPaging, IUser, IUserGroup } from "@/models"
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { useState } from "react"
import { StatusEnum } from "@/enums"

interface UserManagementListingProps {
    pagination: IRequestPaging
    data?: DataResponse<IUser[]>
    onDelete: (data: IUser) => void
    onActionForm: (data: IUser) => void
}

function UserManagementListing(props: UserManagementListingProps) {
    const { data, pagination, onActionForm, onDelete } = props
    const [currentRecord, setCurrentRecord] = useState<IUser>({})

    const items: MenuProps["items"] = [
        {
            label: <div onClick={() => onActionForm(currentRecord)}>Edit</div>,
            key: "0",
        },
        {
            label: <div>Activate</div>,
            key: "1",
        },
        {
            label: <div>Reset password</div>,
            key: "2",
        },
        {
            label: <div onClick={() => onDelete({})}>Delete</div>,
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
                return <span>{Common.renderData(record?.uUserGroup![0]?.uGroups?.name)}</span>
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
            align: "center",
            width: "5%",
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
                pagination={{ current: pagination?.page, total: data?.total }}
            />
        </Space>
    )
}

export default UserManagementListing
