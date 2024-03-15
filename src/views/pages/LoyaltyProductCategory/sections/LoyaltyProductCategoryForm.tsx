import { MessageValidateForm } from "@/enums"
import { ILoyaltyCategory } from "@/models"
import { Col, Form, FormInstance, Input, Row } from "antd"

interface LoyaltyProductCategoryFormProps {
    form: FormInstance<ILoyaltyCategory>
    onSubmitForm: (value: ILoyaltyCategory) => void
}

function LoyaltyProductCategoryForm(props: LoyaltyProductCategoryFormProps) {
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
                    <Form.Item label="Description" name={"description"}>
                        <Input.TextArea placeholder="Description" rows={4} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default LoyaltyProductCategoryForm
