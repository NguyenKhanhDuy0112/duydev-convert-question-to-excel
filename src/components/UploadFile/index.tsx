import { Upload, message } from "antd"
import type { RcFile, UploadChangeParam, UploadProps, UploadFile as UploadFileAntd } from "antd/es/upload"
import { useMemo, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { getBase64 } from "@/helpers/utilities"

interface UploadFileProps {
    imageUrl?: string
    onChange: (info: RcFile) => void
}
function UploadFile(props: UploadFileProps) {
    const { imageUrl, onChange } = props
    const [image, setImage] = useState<string>(imageUrl || "")
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!")
        }
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isLt1M) {
            message.error("Image must smaller than 1MB!")
        }
        return isJpgOrPng && isLt1M
    }

    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFileAntd>) => {
        getBase64(info.file.originFileObj as RcFile, (url) => {
            setImage(url as string)
            onChange(info.file.originFileObj as RcFile)
        })
    }

    const renderImageUrl = useMemo(() => {
        if (image) {
            return <img src={image} alt="" />
        } else {
            return (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            )
        }
    }, [image])

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            accept="image/*"
        >
            {renderImageUrl}
        </Upload>
    )
}

export default UploadFile
