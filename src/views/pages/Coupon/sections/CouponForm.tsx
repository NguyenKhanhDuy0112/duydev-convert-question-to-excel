//CONSTANTS
import { INIT_PAGINATION, TAB_LANGS } from "@/constants"

//ENUMS
import { FormatDateEnum, StatusCoupon } from "@/enums"

//MODELS
import { ICategory, ICoupon } from "@/models"

//SERVICES
import { useGetCouponsTypeApiQuery } from "@/services/coupon.service"
import { useGetCategoriesApiQuery } from "@/services/category.service"

//COMPONENTS
import { Card, Col, DatePicker, Divider, Form, FormInstance, Input, InputNumber, Row, Select, Tabs } from "antd"
import TreeCheckbox from "@/components/TreeCheckbox"
import UploadFile from "@/components/UploadFile"
import TextEditor from "@/components/TextEditor"

interface CouponFormProps {
    data?: ICoupon
    form: FormInstance<ICoupon>
    onSubmitForm: (value: ICoupon) => void
}
function CouponForm(props: CouponFormProps) {
    const { form, onSubmitForm } = props

    //SERVICES
    const { data: dataCategories } = useGetCategoriesApiQuery(INIT_PAGINATION)
    const { data: dataCouponType } = useGetCouponsTypeApiQuery()

    return (
        <Form
            onFinish={onSubmitForm}
            autoComplete="off"
            layout="vertical"
            labelAlign="left"
            wrapperCol={{ span: 24 }}
            form={form}
            initialValues={{
                langs: TAB_LANGS?.map((item) => ({ lang: item?.value })),
            }}
        >
            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item name={"image"}>
                        <UploadFile
                            imageUrl={form.getFieldValue("image") || ""}
                            onChange={(value) => form.setFieldValue("image", value)}
                        />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Code" name={"code"}>
                        <Input placeholder="Code" />
                    </Form.Item>
                    <Form.Item label="Discount" name={"discount"}>
                        <InputNumber placeholder="Discount" />
                    </Form.Item>
                    <Form.Item label="Coupon type ID" name={"coupon_type_id"}>
                        <Select placeholder="Select coupon type">
                            {dataCouponType?.data?.map((item) => (
                                <Select.Option key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Expiration date" name={"expire_date"}>
                        <DatePicker format={FormatDateEnum.Default} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Maste cate type" name={"cate_types"}>
                        <TreeCheckbox
                            data={
                                dataCategories?.data
                                    ?.filter((cate: ICategory) => cate?.cate_type_id)
                                    .map((cate: ICategory) => ({
                                        key: cate?.cate_type_id || "",
                                        title: cate?.name || " ",
                                        children:
                                            cate?.items
                                                ?.filter((sub: ICategory) => sub?.cate_type_id)
                                                ?.map((sub: ICategory) => ({
                                                    key: sub?.cate_type_id || "",
                                                    title: sub?.name || "",
                                                })) || [],
                                    })) || []
                            }
                            onChange={(value: any) => form.setFieldsValue({ cate_types: value?.checked })}
                            selectedKeys={form.getFieldValue("cate_types") || []}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />

            <Form.List name="langs">
                {(fields, { add, remove }) => (
                    <Tabs>
                        {fields.map((field, index) => (
                            <Tabs.TabPane tab={TAB_LANGS[index].label} key={TAB_LANGS[index].value}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Row gutter={24}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Name"
                                                    name={[field.name, "name"]}
                                                    fieldKey={[field.fieldKey || 0, "name"]}
                                                >
                                                    <Input placeholder="Name" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Currency code"
                                                    name={[field.name, "currency_code"]}
                                                    fieldKey={[field.fieldKey || 0, "currency_code"]}
                                                >
                                                    <Select placeholder="Select currency code">
                                                        <Select.Option key={"$"}>$</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Prefix"
                                                    name={[field.name, "sub_title"]}
                                                    fieldKey={[field.fieldKey || 0, "sub_title"]}
                                                >
                                                    <Select placeholder="Select prefix">
                                                        <Select.Option key={StatusCoupon.Off}>
                                                            {StatusCoupon.Off}
                                                        </Select.Option>
                                                        <Select.Option key={StatusCoupon.On}>
                                                            {StatusCoupon.On}
                                                        </Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item
                                            name={[field.name, "description"]}
                                            fieldKey={[field.fieldKey || 0, "description"]}
                                            label="Content"
                                        >
                                            <TextEditor
                                                value={
                                                    form.getFieldValue(`${field.name}.description`)
                                                        ? form.getFieldValue(`${field.name}.description`)
                                                        : ""
                                                }
                                                onChange={(value) =>
                                                    form.setFieldValue(`${field.name}.description`, value)
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                )}
            </Form.List>
        </Form>
    )
}

export default CouponForm
