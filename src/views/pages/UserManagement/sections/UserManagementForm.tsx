import { MessageValidateForm, RoleUserEnum } from "@/enums"
import { IRoleUser, IUser } from "@/models"
import { Checkbox, Col, Form, FormInstance, Input, Row, Select } from "antd"

interface UserManagementFormProps {
    data?: IUser
    permissions?: IRoleUser[]
    form: FormInstance<IUser>
    onSubmitForm: (value: IUser) => void
}
function UserManagementForm(props: UserManagementFormProps) {
    const { data, permissions, form, onSubmitForm } = props
    console.log("permissions: ", permissions)
    return (
        <Form onFinish={onSubmitForm} labelAlign="left" autoComplete="off" layout="vertical" form={form}>
            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                            {
                                type: "email",
                                message: MessageValidateForm.InvalidEmail,
                            },
                        ]}
                        name={"email"}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Phone Number (Optional)" name={"phone_number"}>
                        <Input placeholder="Phone number" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Last name"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"last_name"}
                    >
                        <Input placeholder="Last name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Last name"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"last_name"}
                    >
                        <Input placeholder="Last name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="User type"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"group_id"}
                    >
                        <Select placeholder="User type">
                            {permissions?.map((item) => (
                                <Select.Option key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default UserManagementForm
