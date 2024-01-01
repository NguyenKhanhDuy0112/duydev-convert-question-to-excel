import { MessageValidateForm } from "@/enums"
import { ICategory } from "@/models"
import { Button, Col, Form, Input, Modal, Row } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { ReactComponent as CloseIcon } from "@/assets/icons/close_icon.svg"

interface FAQsFormProps {
    data?: ICategory
    visible: boolean
    onClose: () => void
}
function FAQsForm(props: FAQsFormProps) {
    const { data, visible, onClose } = props
    const [form] = Form.useForm()

    const handleSubmitForm = (value: ICategory) => {
        console.log("Value: ", value)
    }

    return (
        <Modal
            width={800}
            title="Add FAQs"
            okText="Save"
            onOk={() => form.submit()}
            open={visible}
            onCancel={onClose}
            centered
        >
            <Form
                onFinish={handleSubmitForm}
                labelCol={{ span: 6 }}
                labelAlign="left"
                autoComplete="off"
                wrapperCol={{ span: 24 }}
                form={form}
            >
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
                    <Input.TextArea placeholder="Description" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default FAQsForm
