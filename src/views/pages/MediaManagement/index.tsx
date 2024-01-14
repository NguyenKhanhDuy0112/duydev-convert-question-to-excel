//HOOKS
import { useModal, useNotification } from "@/hooks"
import { useState } from "react"

//MODELS
import { IMedia } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum } from "@/enums"

//ICONS
import { PlusOutlined } from "@ant-design/icons"

//SERVICES
import { useDeleteMediaApiMutation, useGetMediaApiQuery } from "@/services/media.service"

//COMPONENTS
import { Button, Col, Row } from "antd"
import MediaForm from "./sections/MediaForm"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import MediaListing from "./sections/MediaListing"

function MediaManagement() {
    //HOOKS
    const { visible: visibleModalForm, toggle: toggleModalForm } = useModal()
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { showNotification } = useNotification()
    const [currentRecord, setCurrentRecord] = useState<IMedia>({})

    //SERVICES
    const { data, isFetching, refetch } = useGetMediaApiQuery()
    const [deleteMediaApi, { isLoading: isLoadingDelete }] = useDeleteMediaApiMutation()

    const handleSubmitForm = () => {
        refetch()
    }

    const handleToggleModalDelete = (record?: IMedia) => {
        setCurrentRecord(record || {})
        toggleConfirmDelete()
    }

    const handleConfirmDelete = async () => {
        refetch()
        try {
            await deleteMediaApi({ id: currentRecord?.id || "" }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            toggleConfirmDelete()
            refetch()
        } catch (e) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
        }
    }

    return (
        <PageWrapper title="Media Management">
            <Row justify={"space-between"} className="m-b-6">
                <Col span={6}></Col>
                <Col xl={{ span: 3 }} lg={{ span: 4 }} xs={{ span: 6 }}>
                    <Button onClick={toggleModalForm} icon={<PlusOutlined />} className="w-100" type="primary">
                        Upload
                    </Button>
                </Col>
            </Row>
            <MediaListing loading={isFetching} data={data?.data} onDelete={handleToggleModalDelete} />
            <MediaForm show={visibleModalForm} onClose={toggleModalForm} onSubmitForm={handleSubmitForm} />
            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                isLoading={isLoadingDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default MediaManagement
