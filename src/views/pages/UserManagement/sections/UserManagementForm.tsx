import { MessageValidateForm, RoleUserEnum } from "@/enums"
import { ICategory, IUser } from "@/models"
import { Button, Checkbox, Col, Form, FormInstance, Input, Modal, Row, Select } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { ReactComponent as CloseIcon } from "@/assets/icons/close_icon.svg"

interface UserManagementFormProps {
    data?: IUser
    form: FormInstance<IUser>
    onSubmitForm: (value: IUser) => void
}
function UserManagementForm(props: UserManagementFormProps) {
    const { data, form, onSubmitForm } = props

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
                    <Form.Item
                        label="Phone Number (Optional)"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"phone_number"}
                    >
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
                        name={"user_type"}
                    >
                        <Select placeholder="User type">
                            <Select.Option key={RoleUserEnum.Admin}>{RoleUserEnum.Admin}</Select.Option>
                            <Select.Option key={RoleUserEnum.Partner}>{RoleUserEnum.Partner}</Select.Option>
                            <Select.Option key={RoleUserEnum.Staff}>{RoleUserEnum.Staff}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}></Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Permissions">
                        <Checkbox.Group>
                            <Row gutter={[6, 6]}>
                                <Col span={12}>
                                    <Checkbox value="User Managemen">User Management</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="Category">Category</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="Content Management">Content Management</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="FAQs">FAQs</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="Coupons">Coupons</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default UserManagementForm
