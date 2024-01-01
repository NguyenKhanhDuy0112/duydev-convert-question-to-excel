import { MessageValidateForm, StatusCoupon } from "@/enums"
import { ICategory, ICoupon } from "@/models"
import { DatePicker, Form, Input, InputNumber, Modal, Select, Switch } from "antd"
import { ReactComponent as CloseIcon } from "@/assets/icons/close_icon.svg"

interface PersonalExperienceFormProps {
    data?: ICoupon
    visible: boolean
    onClose: () => void
}
function PersonalExperienceForm(props: PersonalExperienceFormProps) {
    const { data, visible, onClose } = props
    const [form] = Form.useForm()

    const handleSubmitForm = (value: ICategory) => {
        console.log("Value: ", value)
    }

    return (
        <Modal
            width={800}
            title="Add personal experience"
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
                    <Input.TextArea rows={4} placeholder="Description" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default PersonalExperienceForm
