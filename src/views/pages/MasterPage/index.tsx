//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ICategoryType, ICoupon, IRequestPaging } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//SERVICES
import {
    useCreateMasterPageApiMutation,
    useDeleteMasterPageApiMutation,
    useGetMasterPagesApiQuery,
    useUpdateMasterPageApiMutation,
} from "@/services/masterPage.service"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//COMPONENTS
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import { Button, Form } from "antd"
import MasterPageListing from "./sections/MasterPageListing"
import MasterPageForm from "./sections/MasterPageForm"

function MasterPage() {
    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const { showNotification } = useNotification()

    //STATES
    const [pagination, setPagination] = useState<IRequestPaging>(INIT_PAGINATION)
    const [dataDetail, setDataDetail] = useState<ICategoryType | undefined>({})

    //SERVICES
    const { data, isFetching: isFetchingList, refetch } = useGetMasterPagesApiQuery(pagination)
    const [createContentTypeApi, { isLoading: isLoadingCreate }] = useCreateMasterPageApiMutation()
    const [updateContentTypeApi, { isLoading: isLoadingUpdate }] = useUpdateMasterPageApiMutation()
    const [deleteContentTypeApi, { isLoading: isLoadingDelete }] = useDeleteMasterPageApiMutation()

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
            } else {
                setDataDetail({})
                form.resetFields()
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
        return navigate(`${PageRoute.MasterPage}?id=${values?.id ? values?.id : ""}`)
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
            title="Master Page"
        >
            {!isFormPage && (
                <MasterPageListing
                    data={data}
                    pagination={pagination}
                    loading={isFetchingList}
                    onActionForm={handleRedirectForm}
                    onDelete={handleToggleModalDelete}
                />
            )}

            {isFormPage && <MasterPageForm form={form} onSubmitForm={handleSubmitForm} />}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                isLoading={isLoadingDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default MasterPage
