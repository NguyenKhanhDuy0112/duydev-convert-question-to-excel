import { IRoleUser } from "@/models"
import { Form, FormInstance, Input } from "antd"

interface GroupRoleFormProps {
    form: FormInstance<IRoleUser>
}

function GroupRoleForm(props: GroupRoleFormProps) {
    const { form } = props

    const handleSubmitForm = (value: IRoleUser) => {
        console.log("Value: ", value)
    }

    return (
        <Form form={form} onFinish={handleSubmitForm}>
            <Form.Item>
                <Input placeholder="Name" />
            </Form.Item>
        </Form>
    )
}

export default GroupRoleForm
