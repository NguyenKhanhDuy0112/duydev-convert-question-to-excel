//CONSTANTS
import { CONTENT_STATUS_OPTIONS, TAB_LANGS } from "@/constants"

//ENUMS
import { ContentTypeEnum, LangCodeEnum, MasterCateEnum, MessageValidateForm, PermissionUserEnum } from "@/enums"

//HOOKS
import { useProfile, useRouter } from "@/hooks"
import { useEffect } from "react"

//MODELS
import { IContentForm, IContentItem } from "@/models"

//SERVICES
import { useGetContentTypeManagementApiQuery } from "@/services/contentManagement.service"

//COMPONENTS
import { Button, Col, Form, Input, Modal, Row, Select, Tabs } from "antd"
import TextEditor from "@/components/TextEditor"

interface ModalFormContentProps {
    isLoading?: boolean
    data?: IContentItem
    show: boolean
    onClose: () => void
    onSubmitForm: (value: IContentForm) => void
}

function ModalFormContent(props: ModalFormContentProps) {
    const { isLoading, data, show, onClose, onSubmitForm } = props

    //ANTD
    const [form] = Form.useForm()

    //HOOKS
    const { params } = useRouter()
    const { permissions_name } = useProfile()

    //SERVICES
    const { data: contentTypes } = useGetContentTypeManagementApiQuery()

    useEffect(() => {
        if (data?.en || data?.vi) {
            const payload = {
                ...data?.en,
                ...data?.vi,
                items: TAB_LANGS?.map((item) => data?.[item?.value]),
            }
            form.setFieldsValue(payload)
        } else {
        }
    }, [data])

    const handleSubmitForm = async (values: IContentForm) => {
        const payload: IContentForm = {
            items: values?.items,
            cate_type_id: params?.cateTypeID as string,
            type_id: values?.type_id,
            status: values?.status,
            master_type: MasterCateEnum.COUPON_MASTER_CATE,
            master_content_id: data && data[LangCodeEnum.EN] ? data[LangCodeEnum.EN].master_content_id : undefined,
        }

        onSubmitForm(payload)
    }

    return (
        <Modal
            width={"100vw"}
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
            title="Content"
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ items: TAB_LANGS?.map((item) => ({ lang: item?.value, name: "", description: "" })) }}
                onFinish={handleSubmitForm}
            >
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Form.Item
                            rules={[{ required: true, message: MessageValidateForm.Required }]}
                            label="Category type"
                            name={`type_id`}
                        >
                            <Select placeholder="Select category type">
                                {contentTypes?.data
                                    ?.filter((item) => item?.name !== ContentTypeEnum.PAGE)
                                    ?.map((item) => (
                                        <Select.Option key={item.id}>{item.name}</Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    {data?.en?.id && permissions_name?.includes(PermissionUserEnum.ApprovalManagement) && (
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item label="Status" name={`status`}>
                                <Select placeholder="Select status" options={CONTENT_STATUS_OPTIONS} />
                            </Form.Item>
                        </Col>
                    )}
                </Row>
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <Tabs>
                            {fields.map((field, index) => (
                                <Tabs.TabPane tab={TAB_LANGS[index].label} key={TAB_LANGS[index].value}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                {...field}
                                                label="Name"
                                                name={[field.name, "name"]}
                                                fieldKey={[field.fieldKey || 0, "name"]}
                                            >
                                                <Input placeholder="Name" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Description"
                                                name={[field.name, "description"]}
                                                fieldKey={[field.fieldKey || 0, "description"]}
                                            >
                                                <TextEditor
                                                    value={form.getFieldValue(`${field.name}.description`) || ""}
                                                    onChange={(value) =>
                                                        form.setFieldsValue({
                                                            [`${field.name}.description`]: value,
                                                        })
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

export default ModalFormContent
