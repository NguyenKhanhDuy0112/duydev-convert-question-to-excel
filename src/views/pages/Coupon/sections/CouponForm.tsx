//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//ENUMS
import { FormatDateEnum, StatusCoupon, UploadTypeEnum } from "@/enums"

//HOOKS
import { useCommon } from "@/hooks"

//MODELS
import { ICategory, ICoupon, ILanguage } from "@/models"

//SERVICES
import { useGetCouponsTypeApiQuery } from "@/services/coupon.service"
import { useGetCategoriesApiQuery } from "@/services/category.service"

//COMPONENTS
import { Col, DatePicker, Divider, Form, FormInstance, Input, InputNumber, Row, Select, Switch, Tabs } from "antd"
import TreeCheckbox from "@/components/TreeCheckbox"
import UploadFile from "@/components/UploadFile"

interface CouponFormProps {
    data?: ICoupon
    form: FormInstance<ICoupon>
    onSubmitForm: (value: ICoupon) => void
}
function CouponForm(props: CouponFormProps) {
    const { form, onSubmitForm } = props

    //HOOKS
    const { languages } = useCommon()

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
                langs: languages?.map((item: ILanguage) => ({ lang: item?.locale })),
                is_verify: true,
            }}
        >
            <Row gutter={20}>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                    <div className="d-flex justify-center">
                        <Form.Item name={"image"}>
                            <UploadFile
                                uploadType={UploadTypeEnum.GALLERY}
                                imageUrl={form.getFieldValue("image") || ""}
                                onChange={(value) => form.setFieldValue("image", value)}
                            />
                        </Form.Item>
                    </div>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Code" name={"code"}>
                        <Input placeholder="Code" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Discount" name={"discount"}>
                        <InputNumber placeholder="Discount" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Sorting" name={"sorting"}>
                        <InputNumber placeholder="Sorting" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item name={"is_verify"} label="Verify" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Coupon type ID" name={"coupon_type_id"}>
                        <Select placeholder="Select coupon type">
                            {dataCouponType?.data?.map((item) => (
                                <Select.Option key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
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
                            selectedKeys={(form.getFieldValue("cate_types") || [])?.map((item: any) =>
                                typeof item === "string" ? item : item?.id
                            )}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />

            <Form.List name="langs">
                {(fields, { add, remove }) => (
                    <Tabs>
                        {fields.map((field, index) => (
                            <Tabs.TabPane tab={languages[index]?.name} key={languages[index]?.id}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Row gutter={24}>
                                            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                                                <Form.Item
                                                    label="Name"
                                                    name={[field.name, "name"]}
                                                    fieldKey={[field.fieldKey || 0, "name"]}
                                                >
                                                    <Input placeholder="Name" />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
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
                                            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
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
                                            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                                                <Form.Item
                                                    name={[field.name, "description"]}
                                                    fieldKey={[field.fieldKey || 0, "description"]}
                                                    label="Description"
                                                >
                                                    <Input.TextArea rows={4} placeholder="Description" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
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
