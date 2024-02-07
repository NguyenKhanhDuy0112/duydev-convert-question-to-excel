//CONSTANTS
import { GENDER_OPTIONS } from "@/constants"

//ENUMS
import { MessageValidateForm } from "@/enums"

//UTILITIES
import { beforeUpload, getBase64 } from "@/helpers/utilities"

//MODELS
import { IUser } from "@/models"
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload"

//COMPONENTS
import { Col, DatePicker, Form, FormInstance, Input, Row, Select, Upload, UploadProps } from "antd"

//HOOKS
import { useEffect, useMemo, useState } from "react"

//ICONS
import { UploadOutlined } from "@ant-design/icons"

interface ProfileFormProps {
    data: IUser
    form: FormInstance<IUser>
    onSubmitForm: (value: IUser) => void
}

function ProfileForm(props: ProfileFormProps) {
    const { data, form, onSubmitForm } = props
    const [image, setImage] = useState<string>("")

    useEffect(() => {
        setImage(data?.image as string)
    }, [data])

    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        getBase64(info.file.originFileObj as RcFile, (url) => {
            setImage(url as string)
        })
    }

    const renderImageUrl = useMemo(() => {
        if (image) {
            return <img src={image} alt="" />
        } else {
            return (
                <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            )
        }
    }, [image])

    return (
        <Form onFinish={onSubmitForm} labelAlign="left" autoComplete="off" layout="vertical" form={form}>
            <div className="d-flex justify-center">
                <Form.Item name={"image"}>
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="upload-avatar"
                        showUploadList={false}
                        beforeUpload={(file) => beforeUpload(file, 1)}
                        onChange={handleChange}
                    >
                        {renderImageUrl}
                    </Upload>
                </Form.Item>
            </div>
            <Row gutter={20}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                            {
                                type: "email",
                                message: MessageValidateForm.InvalidEmail,
                            },
                        ]}
                        name={"email"}
                    >
                        <Input disabled={true} placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Phone Number (Optional)" name={"phone"}>
                        <Input placeholder="Phone number" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="First name"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"first_name"}
                    >
                        <Input placeholder="First name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label="Last name"
                        rules={[
                            {
                                required: true,
                                message: MessageValidateForm.Required,
                            },
                        ]}
                        name={"last_name"}
                    >
                        <Input placeholder="Last name" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Birthday" name={"birthday"}>
                        <DatePicker format={"DD-MM-YYYY"} placeholder="DD-MM-YYYY" />
                    </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item label="Gender" name={"gender"}>
                        <Select placeholder="Select" options={GENDER_OPTIONS} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default ProfileForm
