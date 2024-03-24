//ENUMS
import { INIT_PAGINATION } from "@/constants"
import { MessageValidateForm, ParamsEnum } from "@/enums"

//HOOKS
import { useRouter } from "@/hooks"
import { useState } from "react"

//MODELS
import { Common, ILoyaltyCollectionItemForm, ILoyaltyProduct } from "@/models"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"

//SERVICES
import { useGetLoyaltyProductsApiQuery } from "@/services/loyaltyProduct.service"

//COMPONENTS
import { Col, Divider, Form, FormInstance, InputNumber, Row, Switch, Table } from "antd"
import { formatMoney } from "@/helpers/utilities"

interface LoyaltyCollectionItemFormProps {
    form: FormInstance<ILoyaltyCollectionItemForm>
    onSubmitForm: (value: ILoyaltyCollectionItemForm) => void
}

function LoyaltyCollectionItemForm(props: LoyaltyCollectionItemFormProps) {
    const { form, onSubmitForm } = props
    const [pagination, setPagination] = useState(INIT_PAGINATION)
    const { searchParams } = useRouter()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const { data: products } = useGetLoyaltyProductsApiQuery(pagination)

    const handleSubmitForm = (value: ILoyaltyCollectionItemForm) => {
        onSubmitForm({
            ...value,
            product_ids: selectedRowKeys as string[],
        })
    }

    const handleChangePagination = (pagination: TablePaginationConfig) => {
        setPagination((prevData) => ({
            ...prevData,
            page: Number(pagination.current) || 0,
            limit: Number(pagination.pageSize) || 0,
        }))
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const columns: ColumnsType<ILoyaltyProduct> = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string, record: ILoyaltyProduct) => {
                return (
                    <span className="d-flex items-center gap-2">
                        <img width={50} height={50} src={record?.image} alt={value} />
                        <span className="line-clamp-2">{Common.renderData(value)}</span>
                    </span>
                )
            },
        },
        {
            title: "Stock",
            dataIndex: "available_stock",
            key: "available_stock",
            render: (value: number) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (value: number) => {
                return <span>{Common.renderData(formatMoney(value))}</span>
            },
        },
        {
            title: "Point",
            dataIndex: "point",
            key: "point",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
    ]

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <>
            <Form
                onFinish={handleSubmitForm}
                autoComplete="off"
                layout="vertical"
                labelAlign="left"
                wrapperCol={{ span: 24 }}
                form={form}
                initialValues={{ is_active: true }}
            >
                <Row gutter={20}>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: MessageValidateForm.Required,
                                },
                            ]}
                            label="Sorting"
                            name={"sorting"}
                        >
                            <InputNumber min={0} step={1} placeholder="Sorting" />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <Form.Item label="Active" name={"is_active"} valuePropName="checked">
                            <Switch defaultChecked />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: MessageValidateForm.Required,
                                },
                            ]}
                            label="Price"
                            name={"price"}
                        >
                            <InputNumber
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                                placeholder="Price"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: MessageValidateForm.Required,
                                },
                            ]}
                            label="Stock"
                            name={"stock"}
                        >
                            <InputNumber
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                                placeholder="Stock"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {
                <>
                    <Divider />
                    <h3 className="m-b-4">
                        {!searchParams.get(ParamsEnum.COLLECTION_ITEM_ID) ? "Products" : "Product Infomation"}
                    </h3>
                    <Table
                        rowKey={"id"}
                        scroll={{ x: "auto" }}
                        pagination={{ current: pagination?.page, total: products?.total, pageSize: pagination?.limit }}
                        onChange={handleChangePagination}
                        rowSelection={!searchParams.get(ParamsEnum.COLLECTION_ITEM_ID) ? rowSelection : undefined}
                        columns={columns}
                        dataSource={
                            !searchParams.get(ParamsEnum.COLLECTION_ITEM_ID)
                                ? products?.data
                                : [form.getFieldValue("products")]
                        }
                    />
                </>
            }
        </>
    )
}

export default LoyaltyCollectionItemForm
