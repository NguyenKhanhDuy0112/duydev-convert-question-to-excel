//HOOKS
import { useState } from "react"
import { useModal, useNotification } from "@/hooks"

//MODELS
import { IContentDetail, IContentDetailForm, IContentForm, IContentItem, IContentList } from "@/models"

//SERVICES
import {
    useCreateContentManagementApiMutation,
    useDeleteContentManagementApiMutation,
    useUpdateContentManagementApiMutation,
} from "@/services/contentManagement.service"
import {
    useCreateContentDetailManagementApiMutation,
    useDeleteContentDetailManagementApiMutation,
    useUpdateContentDetailManagementApiMutation,
} from "@/services/contentDetailManagement.service"
import { NotificationMessageEnum, NotificationTypeEnum } from "@/enums"

//ICONS
import { PlusOutlined } from "@ant-design/icons"

//COMPONENTS
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import ModalFormContentDetail from "../../components/ContentDetail/ModalFormContentDetail"
import ModalFormContent from "../../components/Content/ModalFormContent"
import Content from "../../components/Content"
import { Button, Space } from "antd"

interface EditContentProps {
    data?: IContentList
    refetchContent: () => void
}
function EditContent(props: EditContentProps) {
    const { data, refetchContent } = props

    //HOOKS
    const { visible: visibleModalEditContent, toggle: toggleModalEditContent } = useModal()
    const { visible: visibleModalDeleteContent, toggle: toggleModalDeleteContent } = useModal()
    const { visible: visibleModalDeleteContentDetail, toggle: toggleModalDeleteContentDetail } = useModal()
    const { visible: visibleModalEditContentDetail, toggle: toggleModalEditContentDetail } = useModal()

    const { showNotification } = useNotification()

    const [currentMasterContentId, setCurrentMasterContentId] = useState<string>("")
    const [currentContent, setCurrentContent] = useState<IContentItem>()
    const [currentContentDetail, setCurrentContentDetail] = useState<IContentDetail[]>([])

    //SERVICES
    const [createContentApi, { isLoading: isLoadingCreateContent }] = useCreateContentManagementApiMutation()
    const [updateContentApi, { isLoading: isLoadingUpdateContent }] = useUpdateContentManagementApiMutation()
    const [deleteContentApi, { isLoading: isLoadingDeleteContent }] = useDeleteContentManagementApiMutation()

    const [createContentDetailApi, { isLoading: isLoadingCreateContentDetail }] =
        useCreateContentDetailManagementApiMutation()
    const [updateContentDetailApi, { isLoading: isLoadingUpdateContentDetail }] =
        useUpdateContentDetailManagementApiMutation()
    const [deleteContentDetailApi, { isLoading: isLoadingDeleteContentDetail }] =
        useDeleteContentDetailManagementApiMutation()

    const handleToggleModalEditContent = (data?: IContentItem) => {
        toggleModalEditContent()
        setCurrentContent(data || {})
    }

    const handleToggleModalEditContentDetail = (data?: IContentDetail[], master_content_id?: string) => {
        toggleModalEditContentDetail()
        setCurrentMasterContentId(master_content_id || "")
        setCurrentContentDetail(data || [])
    }

    const handleToggleModalDeleteContent = (data?: IContentItem) => {
        toggleModalDeleteContent()
        setCurrentContent(data || {})
    }

    const handleToggleModalDeleteContentDetail = (data?: IContentDetail[]) => {
        toggleModalDeleteContentDetail()
        setCurrentContentDetail(data || [])
    }

    const handleCreateContent = () => {
        toggleModalEditContent()
        setCurrentContent({})
    }

    const handleSubmitFormContent = async (values: IContentForm) => {
        const isEdit = currentContent?.en
        try {
            if (currentContent?.en) {
                await updateContentApi(values)
            } else {
                await createContentApi(values)
            }

            showNotification({
                type: NotificationTypeEnum.Success,
                message: isEdit ? NotificationMessageEnum.UpdateSuccess : NotificationMessageEnum.CreateSuccess,
            })
            toggleModalEditContent()
            refetchContent()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: isEdit ? NotificationMessageEnum.UpdateError : NotificationMessageEnum.CreateError,
            })
        }
    }

    const handleSubmitFormContentDetail = async (values: IContentDetailForm) => {
        const isEdit = currentContentDetail.length > 0
        try {
            const formValues: IContentDetailForm = {
                ...values,
                master_content_id: currentMasterContentId,
            }

            if (currentContentDetail.length > 0) {
                await updateContentDetailApi(formValues)
            } else {
                await createContentDetailApi(formValues)
            }

            showNotification({
                type: NotificationTypeEnum.Success,
                message: isEdit ? NotificationMessageEnum.UpdateSuccess : NotificationMessageEnum.CreateSuccess,
            })
            toggleModalEditContentDetail()
            refetchContent()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: isEdit ? NotificationMessageEnum.UpdateError : NotificationMessageEnum.CreateError,
            })
        }
    }

    const handleConfirmDeleteContent = async () => {
        try {
            await deleteContentApi({ master_content_id: currentContent?.en?.master_content_id || "" }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            refetchContent()
            toggleModalDeleteContent()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
        }
    }

    const handleConfirmDeleteContentDetail = async () => {
        let master_content_detail_id = ""
        currentContentDetail.forEach((item) => {
            if (item?.master_content_detail_id) {
                master_content_detail_id = item?.master_content_detail_id || ""
                return
            }
        })

        try {
            await deleteContentDetailApi({
                master_content_detail_id: master_content_detail_id,
            }).unwrap()

            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            refetchContent()
            toggleModalDeleteContentDetail()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
        }
    }

    return (
        <>
            <div className="d-flex justify-end m-b-4">
                <Button onClick={handleCreateContent} icon={<PlusOutlined />} type="primary">
                    Create New Content
                </Button>
            </div>
            <Space direction="vertical" size="middle">
                {Object.keys(data || {}).map((key: string) => {
                    return (
                        <Content
                            data={data![key] || []}
                            key={key}
                            onEditContent={handleToggleModalEditContent}
                            onDeleteContent={handleToggleModalDeleteContent}
                            onEditContentDetail={handleToggleModalEditContentDetail}
                            onDeleteContentDetail={handleToggleModalDeleteContentDetail}
                        />
                    )
                })}
            </Space>

            <ModalFormContent
                isLoading={isLoadingCreateContent || isLoadingUpdateContent}
                data={currentContent}
                show={visibleModalEditContent}
                onClose={toggleModalEditContent}
                onSubmitForm={handleSubmitFormContent}
            />

            <ModalFormContentDetail
                isLoading={isLoadingCreateContentDetail || isLoadingUpdateContentDetail}
                data={currentContentDetail}
                show={visibleModalEditContentDetail}
                onClose={toggleModalEditContentDetail}
                onSubmitForm={handleSubmitFormContentDetail}
            />

            <ModalConfirmDelete
                visible={visibleModalDeleteContent}
                isLoading={isLoadingDeleteContent}
                onClose={toggleModalDeleteContent}
                onConfirm={handleConfirmDeleteContent}
            />

            <ModalConfirmDelete
                visible={visibleModalDeleteContentDetail}
                isLoading={isLoadingDeleteContentDetail}
                onClose={toggleModalDeleteContentDetail}
                onConfirm={handleConfirmDeleteContentDetail}
            />
        </>
    )
}

export default EditContent
