//ENUMS
import { MessageValidateForm } from "@/enums"

//MODELS
import { IMasterPageForm } from "@/models"

//COMPONENTS
import { Col, Form, FormInstance, Input, Row, Tabs } from "antd"
import { TAB_LANGS } from "@/constants"
import TextEditor from "@/components/TextEditor"

interface MasterPageFormProps {
    form: FormInstance<IMasterPageForm>
    onSubmitForm: (value: IMasterPageForm) => void
}

function MasterPageForm(props: MasterPageFormProps) {
    const { form, onSubmitForm } = props

    return (
        <Form
            onFinish={onSubmitForm}
            layout="vertical"
            initialValues={{ items: TAB_LANGS?.map((item) => ({ lang: item?.value, name: "", description: "" })) }}
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
                        label="Name localise"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"name_localize"}
                    >
                        <Input placeholder="Name localise" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Route"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"route"}
                    >
                        <Input placeholder="Route" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <Tabs>
                        {fields.map((field, index) => (
                            <Tabs.TabPane tab={TAB_LANGS[index].label} key={TAB_LANGS[index].value}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            {...field}
                                            label="Name"
                                            name={[field.name, "name"]}
                                            fieldKey={[field.fieldKey || 0, "name"]}
                                            rules={[{ required: true, message: "Name is required" }]}
                                        >
                                            <Input placeholder="Name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="Description"
                                            name={[field.name, "description"]}
                                            fieldKey={[field.fieldKey || 0, "description"]}
                                            rules={[{ required: true, message: "Description is required" }]}
                                        >
                                            <TextEditor
                                                value={form.getFieldValue(`${field.name}.description`) || ""}
                                                onChange={(value) =>
                                                    form.setFieldsValue({
                                                        [`${field.name}.description`]: value,
                                                    })
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

export default MasterPageForm
