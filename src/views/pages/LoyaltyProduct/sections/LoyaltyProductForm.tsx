import { MessageValidateForm, UploadTypeEnum } from "@/enums"
import { ILoyaltyProduct } from "@/models"
import { Col, Form, FormInstance, Input, InputNumber, Row, Select } from "antd"
import UploadFile from "@/components/UploadFile"
import { useGetLoyaltyProductCategoriesApiQuery } from "@/services/loyaltyProductCategory.service"
import TextArea from "antd/es/input/TextArea"

interface LoyaltyProductFormProps {
    data?: ILoyaltyProduct
    form: FormInstance<ILoyaltyProduct>
    onSubmitForm: (value: ILoyaltyProduct) => void
}

function LoyaltyProductForm(props: LoyaltyProductFormProps) {
    const { data, form, onSubmitForm } = props
    const { data: categories } = useGetLoyaltyProductCategoriesApiQuery({
        page: 1,
        limit: 100,
    })

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
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        label="Name"
                        name={"name"}
                    >
                        <Input placeholder="Name" />
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
                        label="Code"
                        name={"code"}
                    >
                        <Input placeholder="Code" />
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
                        label="Category"
                        name={"category_id"}
                    >
                        <Select placeholder="Select" showSearch optionFilterProp="children">
                            {categories?.data?.map((item) => (
                                <Select.Option key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
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
                        name={"available_stock"}
                    >
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                            placeholder="Stock"
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
                        label="Amount"
                        name={"amount"}
                    >
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                            placeholder="Amount"
                        />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Point" name={"point"}>
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                            placeholder="Point"
                        />
                    </Form.Item>
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item label="Description" name={"description"}>
                        <TextArea rows={10} placeholder="Description" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default LoyaltyProductForm
