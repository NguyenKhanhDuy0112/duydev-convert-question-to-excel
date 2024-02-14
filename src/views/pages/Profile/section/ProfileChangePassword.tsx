import { MessageValidateForm } from "@/enums"
import { IUserChangePasswordForm } from "@/models"
import { Col, Form, FormInstance, Input, Row } from "antd"

interface IProfileChangePasswordProps {
    form: FormInstance<IUserChangePasswordForm>
    onSubmitForm: (value: IUserChangePasswordForm) => void
}
function ProfileChangePassword(props: IProfileChangePasswordProps) {
    const { form, onSubmitForm } = props

    return (
        <Row>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                <Form layout="vertical" onFinish={onSubmitForm} form={form}>
                    <Form.Item
                        rules={[{ required: true, message: MessageValidateForm.Required }]}
                        label="Current password"
                        name={"current_password"}
                    >
                        <Input.Password placeholder="Current password" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: MessageValidateForm.Required }]}
                        label="New password"
                        name={"new_password"}
                    >
                        <Input.Password placeholder="New password" />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            { required: true, message: MessageValidateForm.Required },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("new_password") === value) {
                                        return Promise.resolve()
                                    }

                                    return Promise.reject(MessageValidateForm.ConfirmPassword)
                                },
                            }),
                        ]}
                        label="Confirm password"
                        name={"confirm_password"}
                    >
                        <Input.Password placeholder="Confirm password" />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default ProfileChangePassword
