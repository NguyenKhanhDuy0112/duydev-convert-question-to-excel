import { useGetMediaApiQuery } from "@/services/media.service"
import { List, Modal } from "antd"

interface ModalMediaProps {
    show: boolean
    onClose: () => void
    onSelectImage: (value: string) => void
}

function ModalMedia(props: ModalMediaProps) {
    const { show, onClose, onSelectImage } = props
    const { data } = useGetMediaApiQuery()
    //show modal image and select image

    return (
        <Modal footer={null} title={null} width={2000} open={show} onCancel={onClose}>
            <List
                grid={{ gutter: 16, column: 6 }}
                dataSource={data?.data}
                renderItem={(item) => (
                    <List.Item className="modal_media-item" key={item?.id}>
                        <img
                            height={150}
                            onClick={() => onSelectImage(item?.path || "")}
                            className="modal_media-img w-100"
                            src={item?.path}
                            alt={item?.originalname}
                            key={item?.id}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    )
}

export default ModalMedia
