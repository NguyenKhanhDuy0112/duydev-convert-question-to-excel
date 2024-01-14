//UTILITIES
import { getBase64 } from "@/helpers/utilities"

//MODELS
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload"

//HOOKSs
import { useNotification } from "@/hooks"
import { useState } from "react"

//ICONS
import { PlusOutlined } from "@ant-design/icons"

//ENUMS
import { MessageValidateForm, NotificationMessageEnum, NotificationTypeEnum } from "@/enums"

//SERVICES
import { useCreateMediaApiMutation } from "@/services/media.service"

//COMPONENTS
import { Form, Modal, Upload, message } from "antd"

interface MediaFormProps {
    show: boolean
    onClose: () => void
    onSubmitForm: () => void
}

function MediaForm(props: MediaFormProps) {
    const { show, onClose, onSubmitForm } = props
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const { showNotification } = useNotification()

    const [uploadImageApi, { isLoading: isLoadingUploadImage }] = useCreateMediaApiMutation()

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!")
        }
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
            message.error("Image must smaller than 1MB!")
        }
        return isJpgOrPng && isLt2M
    }

    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        getBase64(info.file.originFileObj as RcFile, (url) => {
            setImageUrl(url as string)
        })
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const handleSubmitForm = async (values: any) => {
        try {
            const formData = new FormData()
            formData.append("file", values?.image?.file?.originFileObj)
            await uploadImageApi(formData).unwrap()
            onClose()
            showNotification({ type: NotificationTypeEnum.Success, message: NotificationMessageEnum.UploadSuccess })
            onSubmitForm()
        } catch (err) {
            showNotification({ type: NotificationTypeEnum.Error, message: NotificationMessageEnum.UploadError })
        }
    }

    return (
        <Modal
            open={show}
            onCancel={onClose}
            okText="Save"
            onOk={() => form.submit()}
            confirmLoading={isLoadingUploadImage}
            title="Image"
        >
            <Form onFinish={handleSubmitForm} form={form}>
                <Form.Item rules={[{ required: true, message: MessageValidateForm.RequiredUpload }]} name="image">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        accept="image/*"
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MediaForm
