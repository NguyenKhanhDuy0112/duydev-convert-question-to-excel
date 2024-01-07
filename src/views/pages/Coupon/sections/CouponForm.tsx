//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//ENUMS
import { FormatDateEnum, MessageValidateForm, StatusCoupon } from "@/enums"

//HOOKS
import { useState } from "react"

//MODELS
import { ICategory, ICoupon } from "@/models"

//SERVICES
import { useGetCouponsTypeApiQuery } from "@/services/coupon.service"
import { useGetCategoriesApiQuery } from "@/services/category.service"

//COMPONENTS
import { Col, DatePicker, Form, FormInstance, Input, InputNumber, Row, Select } from "antd"
import TreeCheckbox from "@/components/TreeCheckbox"

interface CouponFormProps {
    data?: ICoupon
    form: FormInstance<ICoupon>
    onSubmitForm: (value: ICoupon) => void
}
function CouponForm(props: CouponFormProps) {
    const { form, data, onSubmitForm } = props

    //STATES
    const [selectedCategory, setSelectedCategory] = useState<ICategory>()

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
        >
            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"name"}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Code" name={"code"}>
                        <Input placeholder="Code" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Discount"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"discount"}
                    >
                        <InputNumber placeholder="Discount" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Currency code"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"currency_code"}
                    >
                        <Select placeholder="Select currency code">
                            <Select.Option key={"$"}>$</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Coupon type ID"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"coupon_type_id"}
                    >
                        <Select placeholder="Select coupon type">
                            {dataCouponType?.data?.map((item) => (
                                <Select.Option key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Prefix"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"prefix"}
                    >
                        <Select placeholder="Select prefix">
                            <Select.Option key={StatusCoupon.Off}>{StatusCoupon.Off}</Select.Option>
                            <Select.Option key={StatusCoupon.On}>{StatusCoupon.On}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Link"
                        rules={[
                            {
                                type: "url",
                                message: MessageValidateForm.InvalidUrl,
                            },
                        ]}
                        name={"link"}
                    >
                        <Input placeholder="Link" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Expiration date"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"expire_date"}
                    >
                        <DatePicker format={FormatDateEnum.Default} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Maste cate type"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"cate_types"}
                    >
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
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"description"}
                    >
                        <Input.TextArea rows={4} placeholder="Description" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default CouponForm
