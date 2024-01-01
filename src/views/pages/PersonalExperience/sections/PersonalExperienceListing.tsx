import { ICategory, ICoupon } from "@/models"
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import moment from "moment"
import { StatusCoupon } from "@/enums"
import { ReactComponent as DotMenuIc } from "@/assets/icons/dots_menu_icon.svg"

interface PersonalExperienceListingProps {
    data: ICoupon[]
    onDelete: (data?: ICoupon) => void
    onCreate: () => void
}

function PersonalExperienceListing(props: PersonalExperienceListingProps) {
    const { data, onCreate, onDelete } = props

    const items: MenuProps["items"] = [
        {
            label: <span>Edit</span>,
            key: "0",
        },
        {
            label: <span onClick={() => onDelete()}>Delete</span>,
            key: "1",
        },
    ]

    const columns: ColumnsType<ICoupon> = [
        {
            title: "Sorting",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "id",
            align: "center",
            width: "5%",
            render: (_, record: ICoupon) => (
                <Dropdown overlayClassName="dropdown-action-table" menu={{ items }} trigger={["click"]}>
                    <Button type="text" className="dot-menu-action">
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
                    <Button onClick={onCreate} icon={<PlusOutlined />} className="w-100" type="primary">
                        Create New
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} rowKey={"id"} dataSource={data} pagination={{ current: 1, total: 20 }} />
        </Space>
    )
}

export default PersonalExperienceListing
