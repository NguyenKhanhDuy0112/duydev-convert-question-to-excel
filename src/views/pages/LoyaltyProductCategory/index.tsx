//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ILoyaltyCategory } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//COMPONENTS
import { Button, Form } from "antd"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import LoyaltyProductCategoryListing from "./sections/LoyaltyProductCategoryListing"
import LoyaltyProductCategoryForm from "./sections/LoyaltyProductCategoryForm"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import {
    useCreateLoyaltyProductCategoryApiMutation,
    useDeleteLoyaltyProductCategoryApiMutation,
    useGetLoyaltyProductCategoriesApiQuery,
    useUpdateLoyaltyProductCategoryApiMutation,
} from "@/services/loyaltyProductCategory.service"

function LoyaltyProductCategory() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<ILoyaltyCategory>()
    const { showNotification } = useNotification()
    const [detail, setDetail] = useState<ILoyaltyCategory>()

    //SERVICES

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isFetching: isFetchingCategories,
        refetch: refetchCategories,
    } = useGetLoyaltyProductCategoriesApiQuery({
        ...pagination,
    })
    const [updateCategoryApi, { isLoading: isLoadingUpdateCategory }] = useUpdateLoyaltyProductCategoryApiMutation()
    const [deleteCategoryApi, { isLoading: isLoadingDeleteCategory }] = useDeleteLoyaltyProductCategoryApiMutation()
    const [createCategoryApi, { isLoading: isLoadingCreateCategory }] = useCreateLoyaltyProductCategoryApiMutation()

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

    const handleRedirectForm = (values?: ILoyaltyCategory) => {
        if (values?.id) {
            return navigate(`${PageRoute.LoyaltyCategory}?id=${values?.id}`)
        } else {
            return navigate(`${PageRoute.LoyaltyCategory}?id=`)
        }
    }

    const handleSubmitForm = async (value: ILoyaltyCategory) => {
        const isEdit = detail?.id
        const payload = { ...value }

        try {
            if (isEdit) {
                await updateCategoryApi({ ...detail, ...payload }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                const res = await createCategoryApi(payload).unwrap()
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
            await deleteCategoryApi({ id: detail?.id }).unwrap()
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

    return (
        <PageWrapper
            footer={
                isFormPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button
                            loading={isLoadingUpdateCategory || isLoadingCreateCategory}
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
            title="Loyalty Categories Management"
        >
            {!isFormPage && (
                <LoyaltyProductCategoryListing
                    data={categories}
                    loading={isLoadingCategories || isFetchingCategories}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onDelete={(data) => {
                        toggleConfirmDelete()
                        setDetail(data)
                    }}
                />
            )}

            {isFormPage && <LoyaltyProductCategoryForm form={form} onSubmitForm={handleSubmitForm} />}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                isLoading={isLoadingDeleteCategory}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default LoyaltyProductCategory
