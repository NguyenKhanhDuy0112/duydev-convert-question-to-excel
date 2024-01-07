//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ICategoryType, ICoupon, IRequestPaging } from "@/models"
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"
import { INIT_PAGINATION } from "@/constants"

//COMPONENTS
import ContentTypeListing from "./sections/ContentTypeListing"
import ContentTypeForm from "./sections/ContentTypeForm"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import { Button, Form } from "antd"
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import {
    useCreateContentTypeApiMutation,
    useDeleteContentTypeApiMutation,
    useGetContentTypeApiQuery,
    useUpdateContentTypeApiMutation,
} from "@/services/contentType.service"

function ContentTypeManagement() {
    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const { showNotification } = useNotification()

    //STATES
    const [pagination, setPagination] = useState<IRequestPaging>(INIT_PAGINATION)
    const [dataDetail, setDataDetail] = useState<ICategoryType | undefined>({})

    //SERVICES
    const { data, refetch } = useGetContentTypeApiQuery(pagination)
    const [createContentTypeApi, { isLoading: isLoadingCreate }] = useCreateContentTypeApiMutation()
    const [updateContentTypeApi, { isLoading: isLoadingUpdate }] = useUpdateContentTypeApiMutation()
    const [deleteContentTypeApi, { isLoading: isLoadingDelete }] = useDeleteContentTypeApiMutation()

    //ANTD
    const [form] = Form.useForm()

    useEffect(() => {
        if (isFormPage) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const couponDetail = data?.data?.find((item) => item.id === id)
                if (couponDetail?.id) {
                    setDataDetail(couponDetail)
                    form.setFieldsValue({ ...couponDetail })
                }
            }
        }
    }, [searchParams, data])

    const handleConfirmDelete = async () => {
        try {
            await deleteContentTypeApi(dataDetail || {}).unwrap()

            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            toggleConfirmDelete()
            refetch()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
            toggleConfirmDelete()
        }
    }

    const handleToggleModalDelete = (data?: ICoupon) => {
        setDataDetail(data)
        toggleConfirmDelete()
    }

    const handleRedirectForm = (values?: ICategoryType) => {
        form.setFieldsValue({ ...values, status: values?.id ? values?.is_active : true })
        setDataDetail(values)
        return navigate(`${PageRoute.ContentTypeManagements}?id=${values?.id ? values?.id : ""}`)
    }

    const handleSubmitForm = async (values: ICategoryType) => {
        const formValues = { ...dataDetail, ...values }
        const isEdit = formValues?.id

        try {
            if (isEdit) {
                await updateContentTypeApi(formValues).unwrap()
            } else {
                await createContentTypeApi(formValues).unwrap()
            }

            showNotification({
                type: NotificationTypeEnum.Success,
                message: isEdit ? NotificationMessageEnum.UpdateSuccess : NotificationMessageEnum.CreateSuccess,
            })
            refetch()
            navigate(-1)
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: isEdit ? NotificationMessageEnum.UpdateError : NotificationMessageEnum.CreateError,
            })
        }
    }

    const isFormPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    return (
        <PageWrapper
            footer={
                isFormPage && (
                    <div className="d-flex items-center gap-4">
                        <Button onClick={() => navigate(-1)} type="dashed">
                            Cancel
                        </Button>
                        <Button
                            loading={isLoadingCreate || isLoadingUpdate}
                            icon={<SaveFilled />}
                            type="primary"
                            onClick={() => form.submit()}
                        >
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={isFormPage}
            title="Master Center"
        >
            {!isFormPage && (
                <ContentTypeListing
                    data={data}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onDelete={handleToggleModalDelete}
                />
            )}

            {isFormPage && <ContentTypeForm form={form} data={dataDetail} onSubmitForm={handleSubmitForm} />}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                isLoading={isLoadingDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default ContentTypeManagement
