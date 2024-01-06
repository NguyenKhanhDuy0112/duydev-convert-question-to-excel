import { AssetsImages } from "@/assets/images"
import Editor from "@/components/Editor"
import { TAB_LANGS } from "@/constants"
import { LangCodeEnum, MessageValidateForm } from "@/enums"
import { useRouter } from "@/hooks"
import { IContentForm, IContentItem } from "@/models"
import { useGetContentTypeManagementApiQuery } from "@/services/contentManagement.service"
import { Badge, Button, Card, Col, Form, Input, Modal, Row, Select, Tabs } from "antd"
import { useEffect } from "react"

interface ModalFormContentProps {
    isLoading?: boolean
    data?: IContentItem
    show: boolean
    onClose: () => void
    onSubmitForm: (value: IContentForm) => void
}

function ModalFormContent(props: ModalFormContentProps) {
    const { isLoading, data, show, onClose, onSubmitForm } = props

    //ANTD
    const [form] = Form.useForm()

    //HOOKS
    const { params } = useRouter()

    //SERVICES
    const { data: contentTypes } = useGetContentTypeManagementApiQuery()

    useEffect(() => {
        if (data?.en || data?.vi) {
            const payload = {
                ...data?.en,
                ...data?.vi,
                items: [{ ...data?.en }, { ...data?.vi }],
            }
            form.setFieldsValue(payload)
            console.log("Data: ", payload)
        } else {
        }
    }, [data])

    const handleSubmitForm = async (values: IContentForm) => {
        const payload: IContentForm = {
            items: values?.items,
            cate_type_id: params?.cateTypeID as string,
            type_id: values?.type_id,
            master_content_id: data && data[LangCodeEnum.EN] ? data[LangCodeEnum.EN].master_content_id : undefined,
        }

        // onSubmitForm(payload)
        console.log("Payload: ", payload)
    }

    return (
        <Modal
            width={"100vw"}
            open={show}
            onCancel={onClose}
            footer={
                <>
                    <Button type="dashed" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button loading={isLoading} onClick={() => form.submit()} type="primary">
                        Save
                    </Button>
                </>
            }
            title="Content"
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ items: TAB_LANGS?.map((item) => ({ lang: item?.value, name: "", description: "" })) }}
                onFinish={handleSubmitForm}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            rules={[{ required: true, message: MessageValidateForm.Required }]}
                            label="Category type"
                            name={`type_id`}
                        >
                            <Select placeholder="Select category type">
                                {contentTypes?.data?.map((item) => (
                                    <Select.Option key={item.id}>{item.name}</Select.Option>
                                ))}
                            </Select>
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
                                            <Card>
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
                                                    <Editor
                                                        value={form.getFieldValue(`${field.name}.description`) || ""}
                                                        onChange={(value) =>
                                                            form.setFieldsValue({
                                                                [`${field.name}.description`]: value,
                                                            })
                                                        }
                                                    />
                                                </Form.Item>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Tabs.TabPane>
                            ))}
                        </Tabs>
                    )}
                </Form.List>
            </Form>
        </Modal>
    )
}

export default ModalFormContent
