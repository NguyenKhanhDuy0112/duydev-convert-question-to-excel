import moment from "moment"

//ENUMS
import { MessageValidateForm } from "@/enums"

//MODELS
import { ILoyaltyCollection } from "@/models"

//COMPONENTS
import { Col, DatePicker, Form, FormInstance, Input, Row, Select, Switch } from "antd"

//CONSTANTS
import { COLLECTION_TYPE_OPTIONS, INIT_PAGINATION } from "@/constants"

//SERVICES
import { useGetLoyaltyTagsApiQuery } from "@/services/loyaltyTag.service"

interface LoyaltyCollectionFormProps {
    form: FormInstance<ILoyaltyCollection>
    onSubmitForm: (value: ILoyaltyCollection) => void
}

function LoyaltyCollectionForm(props: LoyaltyCollectionFormProps) {
    const { form, onSubmitForm } = props
    const { data: tags } = useGetLoyaltyTagsApiQuery(INIT_PAGINATION)

    const handleSubmitForm = (value: ILoyaltyCollection) => {
        onSubmitForm({
            ...value,
            effective_date_start: moment(value?.effective_date![0] || new Date())?.toDate(),
            effective_date_end: moment(value?.effective_date![1] || new Date())?.toDate(),
        })
    }

    return (
        <>
            <Form
                onFinish={handleSubmitForm}
                autoComplete="off"
                layout="vertical"
                labelAlign="left"
                wrapperCol={{ span: 24 }}
                form={form}
                initialValues={{ is_active: true }}
            >
                <Row gutter={20}>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: MessageValidateForm.Required,
                                },
                            ]}
                            label="Name"
                            name={"name"}
                        >
                            <Input placeholder="Name" />
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
                            label="Type"
                            name={"collection_type"}
                        >
                            <Select placeholder="Select" options={COLLECTION_TYPE_OPTIONS} />
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
                            label="Select tags"
                            name={"tag_id"}
                        >
                            <Select
                                placeholder="Select"
                                showSearch
                                optionFilterProp="children"
                                options={tags?.data?.map((item) => ({ value: item?.id, label: item?.name }))}
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
                            label="Validity period"
                            name={"effective_date"}
                        >
                            <DatePicker.RangePicker format={"DD-MM-YYYY"} />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <Form.Item label="Description" name={"description"}>
                            <Input.TextArea rows={4} placeholder="Description" />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <Form.Item label="Active" name={"is_active"} valuePropName="checked">
                            <Switch defaultChecked />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default LoyaltyCollectionForm
