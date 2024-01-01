import { Button, Modal, Space } from "antd"

interface ModalConfirmDeleteProps {
    visible: boolean
    isLoading?: boolean
    onClose: () => void
    onConfirm: () => void
}
function ModalConfirmDelete(props: ModalConfirmDeleteProps) {
    const { visible, isLoading, onClose, onConfirm } = props

    return (
        <Modal
            centered
            className="modalConfirmDelete"
            footer={
                <Space align="center" size={"middle"} className="justify-center">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button loading={isLoading} onClick={onConfirm} type="primary">
                        Delete
                    </Button>
                </Space>
            }
            open={visible}
            onCancel={onClose}
        >
            <h1 className="modalConfirmDelete__title">Delete Confirmation</h1>
            <p className="modalConfirmDelete__des">
                Are you sure you want to delete?
                <br /> Once the item is deleted, it cannot be recovered.
            </p>
        </Modal>
    )
}

export default ModalConfirmDelete
