//HOOKS
import { useEffect, useState } from "react"
import { useModal, useNotification } from "@/hooks"

//MODELS
import { IContent, IContentDetail, IContentDetailForm, IContentForm, IContentItem, IContentList } from "@/models"

//SERVICES
import {
    useCreateContentManagementApiMutation,
    useDeleteContentManagementApiMutation,
    useUpdateContentManagementApiMutation,
    useUpdateStatusContentManagementApiMutation,
} from "@/services/contentManagement.service"
import {
    useCreateContentDetailManagementApiMutation,
    useDeleteContentDetailManagementApiMutation,
    useUpdateContentDetailManagementApiMutation,
    useUpdateStatusContentDetailManagementApiMutation,
} from "@/services/contentDetailManagement.service"

//ENUMS
import { ContentStatusEnum, NotificationMessageEnum, NotificationTypeEnum } from "@/enums"

//ICONS
import { PlusOutlined, EyeOutlined } from "@ant-design/icons"

//COMPONENTS
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import ModalFormContentDetail from "../../components/ContentDetail/ModalFormContentDetail"
import ModalFormContent from "../../components/Content/ModalFormContent"
import Content from "../../components/Content"
import { Button, Space } from "antd"
import ModalConfirm from "@/components/ModalConfirm"

interface EditContentProps {
    data?: IContentList
    onViewContent: () => void
    refetchContent: () => void
}
function EditContent(props: EditContentProps) {
    const { data, refetchContent, onViewContent } = props

    //HOOKS
    const { visible: visibleModalEditContent, toggle: toggleModalEditContent } = useModal()
    const { visible: visibleModalDeleteContent, toggle: toggleModalDeleteContent } = useModal()
    const { visible: visibleModalDeleteContentDetail, toggle: toggleModalDeleteContentDetail } = useModal()
    const { visible: visibleModalEditContentDetail, toggle: toggleModalEditContentDetail } = useModal()
    const { visible: visibleModalConfirm, toggle: toggleModalConfirm } = useModal()

    const { showNotification } = useNotification()

    const [currentMasterContentId, setCurrentMasterContentId] = useState<string>("")
    const [currentContent, setCurrentContent] = useState<IContentItem>()
    const [currentContentDetail, setCurrentContentDetail] = useState<IContentDetail[]>([])
    const [dataSubmit, setDataSubmit] = useState<IContentForm | IContentDetailForm>()

    //SERVICES
    const [createContentApi, { isLoading: isLoadingCreateContent }] = useCreateContentManagementApiMutation()
    const [updateStatusContentApi, { isLoading: isLoadingUpdateStatusContent }] =
        useUpdateStatusContentManagementApiMutation()
    const [updateContentApi, { isLoading: isLoadingUpdateContent }] = useUpdateContentManagementApiMutation()
    const [deleteContentApi, { isLoading: isLoadingDeleteContent }] = useDeleteContentManagementApiMutation()

    const [createContentDetailApi, { isLoading: isLoadingCreateContentDetail }] =
        useCreateContentDetailManagementApiMutation()
    const [updateStatusContentDetailApi, { isLoading: isLoadingUpdateStatusContentDetail }] =
        useUpdateStatusContentDetailManagementApiMutation()
    const [updateContentDetailApi, { isLoading: isLoadingUpdateContentDetail }] =
        useUpdateContentDetailManagementApiMutation()
    const [deleteContentDetailApi, { isLoading: isLoadingDeleteContentDetail }] =
        useDeleteContentDetailManagementApiMutation()

    useEffect(() => {
        setCurrentContent({})
        setCurrentContentDetail([])
        setCurrentMasterContentId("")
    }, [data])

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

    const handleSubmitFormContent = async (values: IContentForm, isSkipCheckStatus?: boolean) => {
        const isEdit = currentContent?.en
        const currentStatus = currentContent?.en?.status || currentContent?.vi?.status
        setDataSubmit(values)
        try {
            if (currentContent?.en) {
                if (!isSkipCheckStatus && currentStatus !== values?.status) {
                    toggleModalConfirm()
                    return
                }
                await updateContentApi(values)

                if (currentStatus !== values?.status) {
                    await updateStatusContentApi(values)
                }
            } else {
                await createContentApi(values)
            }
            setDataSubmit(undefined)
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

    const handleSubmitFormContentDetail = async (values: IContentDetailForm, isSkipCheckStatus?: boolean) => {
        const isEdit = currentContentDetail.length > 0
        setDataSubmit({ ...values, master_content_id: currentMasterContentId })

        try {
            const formValues: IContentDetailForm = {
                ...values,
                master_content_id: currentMasterContentId,
            }

            if (currentContentDetail.length > 0) {
                const currentStatus = currentContentDetail[0]?.status

                if (!isSkipCheckStatus && currentStatus !== values?.status) {
                    toggleModalConfirm()
                    return
                }

                await updateContentDetailApi(formValues)
                if (currentStatus !== values?.status) {
                    await updateStatusContentDetailApi(values)
                }
            } else {
                await createContentDetailApi(formValues)
            }
            setDataSubmit(undefined)
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

    const handleChangeStatusContentDetail = (status: ContentStatusEnum, record?: IContentDetail) => {}

    const handleChangeStatusContent = (status: ContentStatusEnum, record?: IContent) => {}

    const handleConfirmChangeStatus = (data: any) => {
        if (visibleModalEditContent) {
            toggleModalConfirm()
            handleSubmitFormContent(data, true)
        } else if (visibleModalEditContentDetail) {
            toggleModalConfirm()
            handleSubmitFormContentDetail(data, true)
        }
    }

    return (
        <>
            <div className="d-flex justify-between m-b-4 gap-4">
                <Button onClick={onViewContent} icon={<EyeOutlined />} type="primary">
                    View content
                </Button>
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
                            onChangeStatusContent={handleChangeStatusContent}
                            onEditContentDetail={handleToggleModalEditContentDetail}
                            onDeleteContentDetail={handleToggleModalDeleteContentDetail}
                            onChangeStatusContentDetail={handleChangeStatusContentDetail}
                        />
                    )
                })}
            </Space>

            <ModalFormContent
                isLoading={isLoadingCreateContent || isLoadingUpdateContent || isLoadingUpdateStatusContent}
                data={currentContent}
                show={visibleModalEditContent}
                onClose={toggleModalEditContent}
                onSubmitForm={handleSubmitFormContent}
            />

            <ModalFormContentDetail
                isLoading={
                    isLoadingCreateContentDetail || isLoadingUpdateContentDetail || isLoadingUpdateStatusContentDetail
                }
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

            <ModalConfirm
                visible={visibleModalConfirm}
                data={dataSubmit}
                isLoading={isLoadingUpdateStatusContentDetail || isLoadingUpdateStatusContent}
                onClose={toggleModalConfirm}
                title="Change status content"
                description={`Are you sure you want to change the content status to ${dataSubmit?.status}?`}
                onConfirm={handleConfirmChangeStatus}
            />
        </>
    )
}

export default EditContent
