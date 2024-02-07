import { Common, DataResponse, IRequestPaging, IRoleUser, IUser } from "@/models"
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { PlusOutlined } from "@ant-design/icons"
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { useState } from "react"
import { StatusEnum } from "@/enums"

interface GroupRoleListingProps {
    isLoading?: boolean
    pagination: IRequestPaging
    data?: DataResponse<IRoleUser[]>
    onDelete: (data: IRoleUser) => void
    onActionForm: (data: IRoleUser) => void
}

function GroupRoleListing(props: GroupRoleListingProps) {
    const { data, pagination, isLoading, onActionForm, onDelete } = props
    const [currentRecord, setCurrentRecord] = useState<IRoleUser>({})

    const items: MenuProps["items"] = [
        {
            label: <div onClick={() => onActionForm(currentRecord)}>Edit</div>,
            key: "1",
        },
        {
            label: <div onClick={() => onDelete({})}>Delete</div>,
            key: "2",
        },
    ]

    const columns: ColumnsType<IRoleUser> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
                scroll={{ x: "auto" }}
                loading={isLoading}
                dataSource={data?.data || []}
                pagination={{ current: pagination?.page, total: data?.total }}
            />
        </Space>
    )
}

export default GroupRoleListing
