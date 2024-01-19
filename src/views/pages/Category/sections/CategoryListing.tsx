//MODELS
import { ColumnsType } from "antd/es/table"
import { Common, DataResponse, ICategory, ICategoryItem } from "@/models"

//ICONS
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { PlusOutlined } from "@ant-design/icons"

//ENUMS
import { PageRoute, ParamsEnum } from "@/enums"

//HOOKS
import { useMemo, useState } from "react"
import { useRouter } from "@/hooks"

//COMPONENTS
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table } from "antd"

interface CategoryListingProps {
    data?: DataResponse<ICategory[]>
    isLoading: boolean
    onDelete: (data?: ICategory) => void
    onActionForm: (data: ICategory) => void
}

function CategoryListing(props: CategoryListingProps) {
    const { data, isLoading, onActionForm, onDelete } = props
    const { navigate } = useRouter()
    const [currentRecord, setCurrentRecord] = useState<ICategory>({})

    const items = useMemo(() => {
        let items: MenuProps["items"] = [
            {
                label: <div onClick={() => onActionForm(currentRecord)}>Edit</div>,
                key: "0",
            },
            {
                label: <div onClick={() => onDelete()}>Delete</div>,
                key: "3",
            },
        ]

        if (currentRecord?.cate_type_id) {
            items.unshift({
                label: (
                    <div onClick={() => navigate(`${PageRoute.ContentManagements}/${currentRecord?.cate_type_id}`)}>
                        View
                    </div>
                ),
                key: "1",
            })
        } else {
            items.unshift({
                label: (
                    <div
                        onClick={() =>
                            navigate(
                                `${PageRoute.MasterCenter}?${ParamsEnum.ID}=&${ParamsEnum.CATEGORY_ID}=${currentRecord?.id}`
                            )
                        }
                    >
                        Create Master Center
                    </div>
                ),
                key: "1",
            })
        }

        return items
    }, [currentRecord])

    const itemsMenuChildren = useMemo(() => {
        let items: MenuProps["items"] = []

        if (currentRecord?.cate_type_id) {
            items.unshift({
                label: (
                    <div onClick={() => navigate(`${PageRoute.ContentManagements}/${currentRecord?.cate_type_id}`)}>
                        View
                    </div>
                ),
                key: "1",
            })
        } else {
            items.unshift({
                label: (
                    <div
                        onClick={() =>
                            navigate(
                                `${PageRoute.MasterCenter}?${ParamsEnum.ID}=&${ParamsEnum.CATEGORY_ID}=${currentRecord?.category_id}&${ParamsEnum.SUB_CATEGORY_ID}=${currentRecord?.id}`
                            )
                        }
                    >
                        Create Master Center
                    </div>
                ),
                key: "1",
            })
        }

        return items
    }, [currentRecord])

    const columns: ColumnsType<ICategory> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: number) => {
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
            title: "Sorting",
            dataIndex: "sorting",
            key: "sorting",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Action",
            key: "id",
            align: "center",
            width: "5%",
            render: (_, record: ICategory) => (
                <Dropdown overlayClassName="dropdown-action-table" menu={{ items }} trigger={["click"]}>
                    <Button onClick={() => setCurrentRecord(record)} type="text" className="dot-menu-action">
                        <DotMenuIc />
                    </Button>
                </Dropdown>
            ),
        },
    ]

    const columnsDetail: ColumnsType<ICategoryItem> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Locale",
            dataIndex: "locale",
            key: "locale",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Sorting",
            dataIndex: "sorting",
            key: "sorting",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Action",
            key: "id",
            align: "center",
            width: "5%",
            render: (_, record: ICategory) => (
                <Dropdown
                    overlayClassName="dropdown-action-table"
                    menu={{
                        items: itemsMenuChildren,
                    }}
                    trigger={["click"]}
                >
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
                    <Input.Search type="primary" placeholder="Search category" />
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
                dataSource={data?.data ? data?.data : []}
                loading={isLoading}
                pagination={{ current: data?.page, total: data?.total }}
                expandable={{
                    expandedRowRender: (record: ICategory) => {
                        return (
                            <div>
                                <Table
                                    className="tableWrapper__table-detail"
                                    pagination={false}
                                    columns={columnsDetail}
                                    dataSource={
                                        record?.items
                                            ? record?.items?.map((item) => ({ ...item, category_id: record?.id }))
                                            : []
                                    }
                                />
                            </div>
                        )
                    },
                }}
            />
        </Space>
    )
}

export default CategoryListing
