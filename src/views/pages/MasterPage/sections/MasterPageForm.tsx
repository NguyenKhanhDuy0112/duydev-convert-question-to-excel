//ENUMS
import { MessageValidateForm, PermissionUserEnum, RelEnum } from "@/enums"

//MODELS
import { IMasterPageForm } from "@/models"

//HOOKS
import { useCommon, useProfile } from "@/hooks"

//COMPONENTS
import { Col, Form, FormInstance, Input, Row, Select, Tabs } from "antd"
import { CONTENT_STATUS_OPTIONS, REL_OPTIONS } from "@/constants"
import TextEditor from "@/components/TextEditor"
import SelectAddItem from "@/components/SelectAddItem"

interface MasterPageFormProps {
    form: FormInstance<IMasterPageForm>
    onSubmitForm: (value: IMasterPageForm) => void
}

function MasterPageForm(props: MasterPageFormProps) {
    const { form, onSubmitForm } = props
    const { permissions_name } = useProfile()
    const { languages } = useCommon()

    return (
        <Form
            onFinish={onSubmitForm}
            autoComplete="off"
            layout="vertical"
            initialValues={{ items: languages?.map((item) => ({ lang: item?.locale, name: "", description: "" })) }}
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
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Rel"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"rel"}
                    >
                        <SelectAddItem
                            value={form.getFieldValue("rel")}
                            onChange={(value) => form.setFieldsValue({ rel: value as RelEnum })}
                            options={REL_OPTIONS}
                        />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Status"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"status"}
                    >
                        <Select
                            disabled={!permissions_name?.includes(PermissionUserEnum.ApprovalManagement)}
                            placeholder="Select"
                            options={CONTENT_STATUS_OPTIONS}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <Tabs>
                        {fields.map((field, index) => (
                            <Tabs.TabPane tab={languages[index]?.name} key={languages[index]?.id}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            {...field}
                                            label="Name"
                                            name={[field.name, "name"]}
                                            fieldKey={[field.fieldKey || 0, "name"]}
                                            rules={[{ required: true, message: MessageValidateForm.Required }]}
                                        >
                                            <Input placeholder="Name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            hidden
                                            label="Master content ID"
                                            name={[field.name, "master_content_id"]}
                                            fieldKey={[field.fieldKey || 0, "master_content_id"]}
                                        >
                                            <Input placeholder="Name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="Description"
                                            name={[field.name, "description"]}
                                            fieldKey={[field.fieldKey || 0, "description"]}
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
