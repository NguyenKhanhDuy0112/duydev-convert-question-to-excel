import { Button, Modal, Space } from "antd"

interface ModalConfirmProps {
    visible: boolean
    isLoading?: boolean
    onClose: () => void
    onConfirm: (data: any) => void
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    data?: any
}

function ModalConfirm(props: ModalConfirmProps) {
    const {
        data,
        visible,
        title,
        description,
        confirmText = "Ok",
        cancelText = "Cancel",
        isLoading,
        onClose,
        onConfirm,
    } = props

    return (
        <Modal
            centered
            className="modalConfirmDelete"
            footer={
                <Space align="center" size={"middle"} className="justify-center">
                    <Button onClick={onClose}>{cancelText}</Button>
                    <Button loading={isLoading} onClick={() => onConfirm(data)} type="primary">
                        {confirmText}
                    </Button>
                </Space>
            }
            open={visible}
            onCancel={onClose}
        >
            <h1 className="modalConfirmDelete__title">{title}</h1>
            <p className="modalConfirmDelete__des">{description}</p>
        </Modal>
    )
}

export default ModalConfirm
