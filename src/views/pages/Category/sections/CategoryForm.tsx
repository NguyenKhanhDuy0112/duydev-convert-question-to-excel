//ENUMS
import { MessageValidateForm } from "@/enums"

//MODELS
import { ICategory } from "@/models"

//ICONS
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"

//COMPONENTS
import { Button, Col, Form, FormInstance, Input, Row } from "antd"

interface CategoryFormProps {
    form: FormInstance<ICategory>
    onSubmitForm: (value: ICategory) => void
}
function CategoryForm(props: CategoryFormProps) {
    const { form, onSubmitForm } = props

    return (
        <Form
            onFinish={onSubmitForm}
            labelCol={{ span: 6 }}
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
                    <Form.Item
                        label="URL"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                            {
                                type: "url",
                                message: MessageValidateForm.InvalidUrl,
                            },
                        ]}
                        name={"url_link"}
                    >
                        <Input placeholder="URL" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label="Sub menu" name={"items"}>
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row gutter={16}>
                                    <Col span={11}>
                                        <Form.Item
                                            {...restField}
                                            className="flex-1"
                                            name={[name, "name"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: MessageValidateForm.Required,
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "url_link"]}
                                            className="flex-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: MessageValidateForm.Required,
                                                },
                                                {
                                                    type: "url",
                                                    message: MessageValidateForm.InvalidUrl,
                                                },
                                            ]}
                                        >
                                            <Input placeholder="URL" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add sub menu
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
        </Form>
    )
}

export default CategoryForm
