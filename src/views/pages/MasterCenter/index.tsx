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
    useDeleteContentTypeApiMutation,
    useGetContentTypeApiQuery,
    useUpdateContentTypeApiMutation,
} from "@/services/contentType.service"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//COMPONENTS
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import { Button, Form } from "antd"
import MasterCenterListing from "./sections/MasterCenterListing"
import MasterCenterForm from "./sections/MasterCenterForm"

function MasterCenter() {
    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const { showNotification } = useNotification()

    //STATES
    const [pagination, setPagination] = useState<IRequestPaging>(INIT_PAGINATION)
    const [dataDetail, setDataDetail] = useState<ICategoryType | undefined>({})

    //SERVICES
    const { data, isFetching: isFetchingList, refetch } = useGetContentTypeApiQuery(pagination)
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
            } else {
                const body: ICategoryType = {}

                if (searchParams.get(ParamsEnum.CATEGORY_ID)) {
                    body.category_id = String(searchParams.get(ParamsEnum.CATEGORY_ID))
                }
                if (searchParams.get(ParamsEnum.SUB_CATEGORY_ID)) {
                    body.sub_category_id = String(searchParams.get(ParamsEnum.SUB_CATEGORY_ID))
                }

                setDataDetail({
                    ...body,
                })
                form.setFieldsValue({
                    ...body,
                    is_active: true,
                })
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
        return navigate(`${PageRoute.MasterCenter}?id=${values?.id ? values?.id : ""}`)
    }

    const handleSubmitForm = async (values: ICategoryType) => {
        const formValues = { ...dataDetail, ...values }
        const isEdit = formValues?.id

        if (!values?.sub_category_id) {
            delete formValues.sub_category_id
        }

        try {
            if (isEdit) {
                await updateContentTypeApi(formValues).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: isEdit ? NotificationMessageEnum.UpdateSuccess : NotificationMessageEnum.CreateSuccess,
                })
                refetch()
                navigate(-1)
            }
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
                            loading={isLoadingUpdate}
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
                <MasterCenterListing
                    data={data}
                    pagination={pagination}
                    loading={isFetchingList}
                    onActionForm={handleRedirectForm}
                    onDelete={handleToggleModalDelete}
                />
            )}

            {isFormPage && <MasterCenterForm form={form} data={dataDetail} onSubmitForm={handleSubmitForm} />}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                isLoading={isLoadingDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default MasterCenter
