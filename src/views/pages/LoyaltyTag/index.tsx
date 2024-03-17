//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ILoyaltyTag } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//COMPONENTS
import { Button, Form, TablePaginationConfig } from "antd"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import LoyaltyTagListing from "./sections/LoyaltyTagListing"
import LoyaltyTagForm from "./sections/LoyaltyTagForm"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import {
    useCreateLoyaltyTagApiMutation,
    useDeleteLoyaltyTagApiMutation,
    useGetLoyaltyTagsApiQuery,
    useUpdateLoyaltyTagApiMutation,
} from "@/services/loyaltyTag.service"

function LoyaltyTag() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<ILoyaltyTag>()
    const { showNotification } = useNotification()
    const [detail, setDetail] = useState<ILoyaltyTag>()

    //SERVICES

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isFetching: isFetchingCategories,
        refetch: refetchCategories,
    } = useGetLoyaltyTagsApiQuery({
        ...pagination,
    })
    const [updateTagApi, { isLoading: isLoadingUpdateTag }] = useUpdateLoyaltyTagApiMutation()
    const [deleteTagApi, { isLoading: isLoadingDeleteTag }] = useDeleteLoyaltyTagApiMutation()
    const [createTagApi, { isLoading: isLoadingCreateTag }] = useCreateLoyaltyTagApiMutation()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const detail = categories?.data?.find((item) => item.id === id)
                if (detail?.id) {
                    form.setFieldsValue({
                        ...detail,
                    })
                    setDetail(detail)
                }
            }
        } else {
            form.resetFields()
            setDetail({})
        }
    }, [searchParams])

    const isFormPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleRedirectForm = (values?: ILoyaltyTag) => {
        if (values?.id) {
            return navigate(`${PageRoute.LoyaltyTags}?id=${values?.id}`)
        } else {
            return navigate(`${PageRoute.LoyaltyTags}?id=`)
        }
    }

    const handleSubmitForm = async (value: ILoyaltyTag) => {
        const isEdit = detail?.id
        const payload = { ...value }

        try {
            if (isEdit) {
                await updateTagApi({ ...detail, ...payload }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                await createTagApi(payload).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.CreateSuccess,
                })
            }
            refetchCategories()
            navigate(-1)
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: isEdit ? NotificationMessageEnum.UpdateError : NotificationMessageEnum.CreateError,
            })
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteTagApi({ id: detail?.id }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            toggleConfirmDelete()
            setDetail({})
            refetchCategories()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
        }
    }

    const handleChangePagination = (pagination: TablePaginationConfig) => {
        setPagination((prevData) => ({
            ...prevData,
            page: Number(pagination.current) || 0,
            limit: Number(pagination.pageSize) || 0,
        }))
    }

    return (
        <PageWrapper
            footer={
                isFormPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button
                            loading={isLoadingCreateTag || isLoadingUpdateTag}
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
            title="Loyalty Tags Management"
        >
            {!isFormPage && (
                <LoyaltyTagListing
                    data={categories}
                    loading={isLoadingCategories || isFetchingCategories}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onPagination={handleChangePagination}
                    onDelete={(data) => {
                        toggleConfirmDelete()
                        setDetail(data)
                    }}
                />
            )}

            {isFormPage && <LoyaltyTagForm form={form} onSubmitForm={handleSubmitForm} />}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                isLoading={isLoadingDeleteTag}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default LoyaltyTag
