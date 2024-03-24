//CONSTANTS
import { CONTENT_STATUS_OPTIONS, REL_OPTIONS } from "@/constants"

//ENUMS
import {
    ContentTypeEnum,
    LangCodeEnum,
    MasterCateEnum,
    MessageValidateForm,
    ParamsEnum,
    PermissionUserEnum,
} from "@/enums"

//HOOKS
import { useCommon, useProfile, useRouter } from "@/hooks"
import { useEffect } from "react"

//MODELS
import { IContentForm, IContentItem } from "@/models"

//SERVICES
import { useGetContentTypeManagementApiQuery } from "@/services/contentManagement.service"

//COMPONENTS
import { Button, Col, Form, Input, Modal, Row, Select, Spin, Tabs } from "antd"
import TextEditor from "@/components/TextEditor"
import { CloseOutlined } from "@ant-design/icons"
import SelectAddItem from "@/components/SelectAddItem"

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
    const { params, searchParams } = useRouter()
    const { permissions_name } = useProfile()
    const { languages } = useCommon()

    //SERVICES
    const { data: contentTypes } = useGetContentTypeManagementApiQuery()

    useEffect(() => {
        if (data?.en) {
            const payload = {
                ...data?.en,
                items: languages?.map((item) =>
                    data?.[item?.locale as LangCodeEnum]
                        ? data?.[item?.locale as LangCodeEnum]
                        : { lang: item?.locale, name: "", description: "" }
                ),
            }
            form.setFieldsValue(payload)
        } else {
            form.resetFields()
        }
    }, [data, show])

    const handleSubmitForm = async (values: IContentForm) => {
        const payload: IContentForm = {
            items: values?.items,
            cate_type_id: params?.cateTypeID as string,
            type_id: values?.type_id,
            status: values?.status,
            master_type: MasterCateEnum.COUPON_MASTER_CATE,
            rel: values?.rel,
            master_content_id: data && data[LangCodeEnum.EN] ? data[LangCodeEnum.EN].master_content_id : undefined,
        }
        onSubmitForm(payload)
    }

    return (
        <Modal
            width={"100vw"}
            zIndex={100}
            className="custom__modal"
            closeIcon={<CloseOutlined onClick={onClose} />}
            open={show}
            onCancel={() => {}}
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
            <Spin spinning={isLoading}>
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={{
                        items: languages?.map((item) => ({ lang: item?.locale, name: "", description: "" })),
                    }}
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
                        {(data?.en?.id || data?.vi?.id) && (
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Form.Item label="Status" name={`status`}>
                                    <Select
                                        disabled={!permissions_name?.includes(PermissionUserEnum.ApprovalManagement)}
                                        placeholder="Select status"
                                        options={CONTENT_STATUS_OPTIONS}
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        {searchParams.get(ParamsEnum.CATE_TYPE_NAME) === ContentTypeEnum.CONTENT && (
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Form.Item
                                    rules={[{ required: true, message: MessageValidateForm.Required }]}
                                    label="Rel"
                                    name={`rel`}
                                >
                                    <SelectAddItem
                                        value={form.getFieldValue("rel")}
                                        onChange={(value) => form.setFieldsValue({ rel: value })}
                                        options={REL_OPTIONS}
                                    />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <Tabs>
                                {fields.map((field, index) => (
                                    <Tabs.TabPane tab={languages[index]?.name} key={languages[index]?.id}>
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
            </Spin>
        </Modal>
    )
}

export default ModalFormContent
