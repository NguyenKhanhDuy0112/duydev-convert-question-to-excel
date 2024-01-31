import { IRoleUser } from "@/models"
import { Form, FormInstance, Input } from "antd"

interface GroupRoleFormProps {
    form: FormInstance<IRoleUser>
    onSubmitForm: (value: IRoleUser) => void
}

function GroupRoleForm(props: GroupRoleFormProps) {
    const { form, onSubmitForm } = props

    const handleSubmitForm = (value: IRoleUser) => {
        console.log("Value: ", value)
    }

    return (
        <Form onFinish={onSubmitForm} labelAlign="left" autoComplete="off" layout="vertical" form={form}>
            <Form.Item name={"name"}>
                <Input placeholder="Name" />
            </Form.Item>
        </Form>
    )
}

export default GroupRoleForm
