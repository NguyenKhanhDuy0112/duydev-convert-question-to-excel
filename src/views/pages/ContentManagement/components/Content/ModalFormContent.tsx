import { AssetsImages } from "@/assets/images"
import Editor from "@/components/Editor"
import { TAB_LANGS } from "@/constants"
import { LangCodeEnum, MessageValidateForm } from "@/enums"
import { useRouter } from "@/hooks"
import { IContentForm, IContentItem } from "@/models"
import { useGetContentTypeManagementApiQuery } from "@/services/contentManagement.service"
import { Badge, Button, Card, Col, Form, Input, Modal, Row, Select, Tabs } from "antd"
import { useEffect } from "react"

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

    //SERVICES
    const { data: contentTypes } = useGetContentTypeManagementApiQuery()

    useEffect(() => {
        if (data?.en || data?.vi) {
            const payload = {
                ...data?.vi,
                ...data?.en,
                items: [{ ...data?.vi }, { ...data?.en }],
            }
            form.setFieldsValue(payload)
            console.log("Data: ", payload)
        } else {
            form.resetFields()
        }
    }, [data])

    const handleSubmitForm = async (values: IContentForm) => {
        const payload: IContentForm = {
            items: values?.items,
            cate_type_id: params?.cateTypeID as string,
            type_id: values?.type_id,
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
                    <Col span={12}>
                        <Form.Item
                            rules={[{ required: true, message: MessageValidateForm.Required }]}
                            label="Category type"
                            name={`type_id`}
                        >
                            <Select placeholder="Select category type">
                                {contentTypes?.data?.map((item) => (
                                    <Select.Option key={item.id}>{item.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name={"items"}>
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <Row gutter={16}>
                                {fields.map(({ key, name, ...restField }) => {
                                    console.log(key, name, restField)
                                    const lang = restField?.fieldKey === 1 ? LangCodeEnum.VI : LangCodeEnum.EN
                                    return (
                                        <Col span={12}>
                                            <Badge.Ribbon
                                                placement="end"
                                                text={
                                                    <img
                                                        width={25}
                                                        src={
                                                            lang === LangCodeEnum.EN
                                                                ? AssetsImages.unitedStatesFlag
                                                                : AssetsImages.vietnamFlag
                                                        }
                                                    />
                                                }
                                            >
                                                <Card>
                                                    <Row gutter={24}>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                {...restField}
                                                                label="Name"
                                                                name={[name, "name"]}
                                                            >
                                                                <Input placeholder="Name" />
                                                            </Form.Item>
                                                            <Form.Item {...restField} name={[name, "lang"]} hidden>
                                                                <Input type="hidden" placeholder="Name" />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Form.Item
                                                        {...restField}
                                                        label="Description"
                                                        name={[name, "description"]}
                                                    >
                                                        <Editor
                                                            value={
                                                                form.getFieldValue(`${name}.description`)
                                                                    ? form.getFieldValue(`${name}.description`)
                                                                    : ""
                                                            }
                                                            onChange={(value) =>
                                                                form.setFieldValue(`${name}.description`, value)
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Card>
                                            </Badge.Ribbon>
                                        </Col>
                                    )
                                })}
                            </Row>
                        )}
                    </Form.List>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalFormContent
