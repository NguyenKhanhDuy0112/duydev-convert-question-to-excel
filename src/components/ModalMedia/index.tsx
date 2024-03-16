import { useGetMediaApiQuery } from "@/services/media.service"
import { Button, List, Modal, Spin, message } from "antd"
import { CloudUploadOutlined } from "@ant-design/icons"
import MediaForm from "@/views/pages/MediaManagement/sections/MediaForm"
import { useModal } from "@/hooks"

interface ModalMediaProps {
    show: boolean
    onClose: () => void
    onSelectImage: (value: string) => void
}

function ModalMedia(props: ModalMediaProps) {
    const { show, onClose, onSelectImage } = props
    const { visible: visibleMediaForm, toggle: onToggleMediaForm } = useModal()
    const { data, refetch, isLoading: isLoadingMedia } = useGetMediaApiQuery()

    const handleSelectImage = (path: string) => {
        message.success("Select image success!")
        onSelectImage(path || "")
        navigator.clipboard.writeText(path)
    }

    const handleSubmitMedia = () => {
        refetch()
    }

    return (
        <>
            <Modal
                footer={
                    <>
                        <Button type="dashed" onClick={onClose}>
                            Cancel
                        </Button>
                    </>
                }
                zIndex={300}
                className="custom__modal"
                width={2000}
                title="Media"
                open={show}
                onCancel={onClose}
            >
                <Spin spinning={isLoadingMedia}>
                    <div className="d-flex justify-end">
                        <Button
                            className="m-b-4"
                            onClick={onToggleMediaForm}
                            icon={<CloudUploadOutlined />}
                            type="primary"
                        >
                            Upload
                        </Button>
                    </div>
                    <List
                        grid={{ gutter: 16, xs: 1, md: 2, lg: 4, xl: 6 }}
                        dataSource={data?.data}
                        renderItem={(item) => (
                            <List.Item className="modal_media-item" key={item?.id}>
                                <img
                                    height={150}
                                    onClick={() => handleSelectImage(item?.path || "")}
                                    className="modal_media-img w-100"
                                    src={item?.path}
                                    alt={item?.originalname}
                                    key={item?.id}
                                />
                            </List.Item>
                        )}
                    />
                </Spin>
            </Modal>
            <MediaForm show={visibleMediaForm} onClose={onToggleMediaForm} onSubmitForm={handleSubmitMedia} />
        </>
    )
}

export default ModalMedia
