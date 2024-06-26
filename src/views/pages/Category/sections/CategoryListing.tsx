//MODELS
import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { Common, DataResponse, ICategory, ICategoryItem } from "@/models"

//ICONS
import DotMenuIc from "@/assets/icons/dots_menu_icon.svg"
import { PlusOutlined } from "@ant-design/icons"

//ENUMS
import { ContentStatusEnum, PageRoute, ParamsEnum, PermissionUserEnum } from "@/enums"

//HOOKS
import { useMemo, useState } from "react"
import { useProfile, useRouter } from "@/hooks"

//COMPONENTS
import { Button, Col, Dropdown, Input, MenuProps, Row, Space, Table, Tag } from "antd"
import { INIT_PAGINATION } from "@/constants"

interface CategoryListingProps {
    data?: DataResponse<ICategory[]>
    isLoading: boolean
    onPagination: (pagination: TablePaginationConfig) => void
    onDelete: (data?: ICategory) => void
    onActionForm: (data: ICategory) => void
}

function CategoryListing(props: CategoryListingProps) {
    const { data, isLoading, onActionForm, onDelete, onPagination } = props
    const { navigate } = useRouter()
    const { permissions_name } = useProfile()
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
                    <div
                        onClick={() =>
                            navigate(
                                `${PageRoute.ContentManagements}/${currentRecord?.cate_type_id}?${ParamsEnum.CAT_SLUG}=${currentRecord?.slug}`
                            )
                        }
                    >
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
                    <div
                        onClick={() =>
                            navigate(
                                `${PageRoute.ContentManagements}/${currentRecord?.cate_type_id}?&${ParamsEnum.CAT_SLUG}=${currentRecord?.parent_slug}&${ParamsEnum.SUB_CAT_SLUG}=${currentRecord?.slug}`
                            )
                        }
                    >
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
            title: "Number of content",
            dataIndex: "name_localize",
            key: "name_localize",
            render: (_: string, record: ICategory) => {
                return (
                    <span>
                        {Number(record?.items?.reduce((cur, item) => cur + (item?.cate_type_id ? 1 : 0), 0) || 0) +
                            (record?.cate_type_id ? 1 : 0)}
                        /{Number(record?.items?.reduce((cur, item) => cur + (item?.id ? 1 : 0), 0) || 0) + 1}
                    </span>
                )
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
            fixed: "right",
            align: "center",
            width: "8%",
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
            title: "Action",
            align: "center",
            fixed: "right",
            key: "id",
            width: "8%",
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
            <Row justify={"space-between"} gutter={[16, 16]}>
                <Col lg={{ span: 8 }} xs={{ span: 24 }} md={{ span: 12 }}>
                    <Input.Search type="primary" placeholder="Search category" />
                </Col>
                <Col span={"auto"}>
                    <div className="d-flex gap-4">
                        {permissions_name?.includes(PermissionUserEnum.ContentManagement) && (
                            <Button
                                onClick={() => navigate(`${PageRoute.MasterCenter}`)}
                                className="w-100"
                                type="primary"
                            >
                                Master center
                            </Button>
                        )}

                        <Button
                            onClick={() => onActionForm({})}
                            icon={<PlusOutlined />}
                            className="w-100"
                            type="primary"
                        >
                            Create New
                        </Button>
                    </div>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={"id"}
                dataSource={data?.data ? data?.data : []}
                loading={isLoading}
                scroll={{ x: "auto" }}
                onChange={(pagination) => onPagination(pagination)}
                pagination={{ total: data?.total, pageSize: INIT_PAGINATION.limit, current: data?.page }}
                expandable={{
                    expandedRowRender: (record: ICategory) => {
                        return (
                            <div>
                                <Table
                                    className="tableWrapper__table-detail"
                                    pagination={false}
                                    columns={columnsDetail}
                                    scroll={{ x: "auto" }}
                                    dataSource={
                                        record?.items
                                            ? record?.items?.map((item) => ({
                                                  ...item,
                                                  category_id: record?.id,
                                                  parent_slug: record?.slug,
                                              }))
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
