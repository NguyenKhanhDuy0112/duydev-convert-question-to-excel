import { MessageValidateForm } from "@/enums"
import { ILoyaltyTag } from "@/models"
import { Col, Form, FormInstance, Input, Row } from "antd"

interface LoyaltyTagFormProps {
    form: FormInstance<ILoyaltyTag>
    onSubmitForm: (value: ILoyaltyTag) => void
}

function LoyaltyTagForm(props: LoyaltyTagFormProps) {
    const { form, onSubmitForm } = props

    return (
        <Form onFinish={onSubmitForm} labelAlign="left" autoComplete="off" layout="vertical" form={form}>
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
                        label="remake"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"remake"}
                    >
                        <Input placeholder="Remake" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default LoyaltyTagForm
