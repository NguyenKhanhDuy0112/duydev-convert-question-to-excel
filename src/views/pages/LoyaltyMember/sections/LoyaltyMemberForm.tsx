import { MessageValidateForm, UploadTypeEnum } from "@/enums"
import { ILoyaltyMemberForm } from "@/models"
import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from "antd"
import UploadFile from "@/components/UploadFile"
import { GENDER_OPTIONS, INIT_PAGINATION } from "@/constants"
import { useGetLoyaltyTagsApiQuery } from "@/services/loyaltyTag.service"

interface LoyaltyMemberFormProps {
    form: FormInstance<ILoyaltyMemberForm>
    onSubmitForm: (value: ILoyaltyMemberForm) => void
}

function LoyaltyMemberForm(props: LoyaltyMemberFormProps) {
    const { form, onSubmitForm } = props
    const { data: memberTags } = useGetLoyaltyTagsApiQuery({ ...INIT_PAGINATION, limit: 100 })

    return (
        <Form
            onFinish={onSubmitForm}
            autoComplete="off"
            layout="vertical"
            labelAlign="left"
            wrapperCol={{ span: 24 }}
            form={form}
        >
            <Row gutter={20}>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                    <div className="d-flex justify-center">
                        <Form.Item name={"image"}>
                            <UploadFile
                                uploadType={UploadTypeEnum.GALLERY}
                                imageUrl={form.getFieldValue("image") || ""}
                                onChange={(value) => form.setFieldValue("image", value)}
                            />
                        </Form.Item>
                    </div>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        label="First name"
                        name={"first_name"}
                    >
                        <Input placeholder="First name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        label="Last name"
                        name={"last_name"}
                    >
                        <Input placeholder="Last name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Nick name" name={"nick_name"}>
                        <Input placeholder="Nick name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Gender" name={"gender"}>
                        <Select placeholder="Select" options={GENDER_OPTIONS} />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Member Tags" name={"member_tags"}>
                        <Select
                            mode="multiple"
                            placeholder="Select"
                            optionFilterProp="children"
                            options={memberTags?.data?.map((item) => ({ value: item?.id, label: item?.name }))}
                        />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        label="Phone"
                        name={"phone"}
                    >
                        <Input placeholder="Phone" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Email" name={"email"}>
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        label="Channel"
                        name={"channel"}
                    >
                        <Select placeholder="Select">
                            <Select.Option key={"loyalty"}>Loyalty</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Birthday" name={"birthday"}>
                        <DatePicker format={"DD-MM-YYYY"} placeholder="DD-MM-YYYY" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Address" name={"address"}>
                        <Input placeholder="Address" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default LoyaltyMemberForm
