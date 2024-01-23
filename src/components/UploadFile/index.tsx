//MODELS
import type { RcFile, UploadChangeParam, UploadProps, UploadFile as UploadFileAntd } from "antd/es/upload"

//HOOKS
import { MouseEvent, useMemo, useState } from "react"
import { useModal } from "@/hooks"

//ICONS
import { CloudUploadOutlined, CloseOutlined } from "@ant-design/icons"

//UTILITIES
import { getBase64 } from "@/helpers/utilities"

//ENUMS
import { UploadTypeEnum } from "@/enums"

//COMPONENTS
import { Upload, message } from "antd"
import ModalMedia from "../ModalMedia"

interface UploadFileProps {
    imageUrl?: string
    uploadType: UploadTypeEnum
    onChange: (info: RcFile | string) => void
}
function UploadFile(props: UploadFileProps) {
    const { imageUrl, uploadType, onChange } = props
    const [image, setImage] = useState<string>(imageUrl || "")
    const { visible, toggle } = useModal()

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
                    <CloudUploadOutlined size={30} />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            )
        }
    }, [image])

    const handleSelectImage = (image: string) => {
        toggle()
        setImage(image)
        onChange(image as string)
    }

    const handleDeleteImage = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setImage("")
        onChange("")
    }

    return (
        <>
            {uploadType === UploadTypeEnum.GALLERY ? (
                <button onClick={toggle} type="button" className="uploadFile">
                    {renderImageUrl}
                    {image && (
                        <button type="button" onClick={(e) => handleDeleteImage(e)} className="uploadFile__close">
                            <CloseOutlined />
                        </button>
                    )}
                </button>
            ) : (
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {renderImageUrl}
                </Upload>
            )}
            <ModalMedia show={visible} onClose={toggle} onSelectImage={handleSelectImage} />
        </>
    )
}

export default UploadFile
