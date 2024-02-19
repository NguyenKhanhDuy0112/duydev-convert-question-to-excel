//CONSTANTS
import { CONTENT_STATUS_OPTIONS, TAB_LANGS } from "@/constants"

//HOOKS
import { useEffect } from "react"
import { useProfile, useRouter } from "@/hooks"

//MODELS
import { IContentDetail, IContentDetailForm } from "@/models"

//COMPONENTS
import { Button, Card, Col, Form, Input, Modal, Row, Select, Tabs } from "antd"
import TextEditor from "@/components/TextEditor"
import { PermissionUserEnum } from "@/enums"

interface ModalFormContentDetailProps {
    isLoading?: boolean
    data?: IContentDetail[]
    onSubmitForm: (value: IContentDetailForm) => void
    show: boolean
    onClose: () => void
}

function ModalFormContentDetail(props: ModalFormContentDetailProps) {
    const { isLoading, data, show, onClose, onSubmitForm } = props

    //ANTD
    const [form] = Form.useForm()
    const { params } = useRouter()
    const { permissions_name } = useProfile()

    useEffect(() => {
        if (data?.length) {
            const payload = {
                status: data?.[0]?.status,
                items: TAB_LANGS?.map((item) => data?.find((i) => i?.lang === item?.value)),
            }
            form.setFieldsValue(payload)
        } else {
            form.resetFields()
        }
    }, [data, show])

    const handleSubmitForm = async (values: IContentDetailForm) => {
        try {
            const payload: IContentDetailForm = {
                items: values?.items,
                status: values?.status,
                master_content_id: data?.[0]?.master_content_id,
                master_content_detail_id: data?.[0]?.master_content_detail_id,
            }

            onSubmitForm(payload)
        } catch (err) {}
    }

    return (
        <Modal
            width={2000}
            zIndex={9998}
            open={show}
            onCancel={onClose}
            footer={
                <>
                    <Button type="dashed" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button loading={isLoading} onClick={() => form.submit()} type="primary">
                        Save
                    </Button>
                </>
            }
            title="Content Detail"
        >
            <Form
                initialValues={{
                    items: TAB_LANGS?.map((item) => ({ lang: item?.value, title: "", sub_title: "", content: "" })),
                }}
                layout="vertical"
                form={form}
                onFinish={handleSubmitForm}
            >
                {data?.length ? (
                    <Row>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item label="Status" name={"status"}>
                                <Select
                                    disabled={!permissions_name?.includes(PermissionUserEnum.ApprovalManagement)}
                                    placeholder="Select"
                                    options={CONTENT_STATUS_OPTIONS}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                ) : (
                    ""
                )}
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <Tabs>
                            {fields.map((field, index) => (
                                <Tabs.TabPane tab={TAB_LANGS[index].label} key={TAB_LANGS[index].value}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Row gutter={24}>
                                                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                                    <Form.Item
                                                        label="Title"
                                                        name={[field.name, "title"]}
                                                        fieldKey={[field.fieldKey || 0, "title"]}
                                                    >
                                                        <Input placeholder="Title" />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                                    <Form.Item
                                                        label="Sub Title"
                                                        name={[field.name, "sub_title"]}
                                                        fieldKey={[field.fieldKey || 0, "sub_title"]}
                                                    >
                                                        <Input placeholder="Sub title" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Form.Item
                                                name={[field.name, "content"]}
                                                fieldKey={[field.fieldKey || 0, "content"]}
                                                label="Content"
                                            >
                                                <TextEditor
                                                    value={
                                                        form.getFieldValue(`${field.name}.content`)
                                                            ? form.getFieldValue(`${field.name}.content`)
                                                            : ""
                                                    }
                                                    onChange={(value) =>
                                                        form.setFieldValue(`${field.name}.content`, value)
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Tabs.TabPane>
                            ))}
                        </Tabs>
                    )}
                </Form.List>
            </Form>
        </Modal>
    )
}

export default ModalFormContentDetail
