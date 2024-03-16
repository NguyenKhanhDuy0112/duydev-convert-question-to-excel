import dayjs from "dayjs"

//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ILoyaltyProduct, IUser } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//COMPONENTS
import { Button, Form } from "antd"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import LoyaltyProductListing from "./sections/LoyaltyProductListing"
import LoyaltyProductForm from "./sections/LoyaltyProductForm"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import { useCreateMediaApiMutation } from "@/services/media.service"
import {
    useCreateLoyaltyProductApiMutation,
    useDeleteLoyaltyProductApiMutation,
    useGetLoyaltyProductsApiQuery,
    useUpdateLoyaltyProductApiMutation,
} from "@/services/loyaltyProduct.service"

function LoyaltyProduct() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<ILoyaltyProduct>()
    const { showNotification } = useNotification()
    const [detail, setDetail] = useState<ILoyaltyProduct>()

    //SERVICES
    const {
        data,
        isLoading: isLoadingListProducts,
        isFetching: isFetchingListProducts,
        refetch: refetchListProducts,
    } = useGetLoyaltyProductsApiQuery(pagination)

    const [updateProductApi, { isLoading: isLoadingUpdateProduct }] = useUpdateLoyaltyProductApiMutation()
    const [deleteProductApi, { isLoading: isLoadingDeleteProduct }] = useDeleteLoyaltyProductApiMutation()
    const [createProductApi, { isLoading: isLoadingCreateProduct }] = useCreateLoyaltyProductApiMutation()
    const [uploadImageApi, { isLoading: isLoadingCreateMedia }] = useCreateMediaApiMutation()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const detail = data?.data?.find((item) => item.id === id)
                if (detail?.id) {
                    form.setFieldsValue({
                        ...detail,
                    })
                    setDetail({ ...detail })
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

    const handleRedirectForm = (values?: IUser) => {
        if (values?.id) {
            return navigate(`${PageRoute.LoyaltyProduct}?id=${values?.id}`)
        } else {
            return navigate(`${PageRoute.LoyaltyProduct}?id=`)
        }
    }

    const handleSubmitForm = async (value: ILoyaltyProduct) => {
        const isEdit = detail?.id
        const payload = { ...detail, ...value }

        try {
            if (payload?.image && typeof payload?.image !== "string") {
                try {
                    const formData = new FormData()
                    formData.append("file", payload?.image)
                    const responseImage = await uploadImageApi(formData).unwrap()
                    payload.image = responseImage?.link_url
                } catch (err) {
                    showNotification({
                        type: NotificationTypeEnum.Error,
                        message: NotificationMessageEnum.UploadError,
                    })
                }
            }

            if (isEdit) {
                await updateProductApi({ ...payload }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                const res = await createProductApi(payload).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.CreateSuccess,
                })
            }
            refetchListProducts()
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
            await deleteProductApi({ id: detail?.id }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            toggleConfirmDelete()
            setDetail({})
            refetchListProducts()
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
                            loading={isLoadingUpdateProduct || isLoadingCreateProduct || isLoadingCreateMedia}
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
            title="Loyalty Product"
        >
            {!isFormPage && (
                <LoyaltyProductListing
                    data={data}
                    loading={isLoadingListProducts || isFetchingListProducts}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onDelete={(data) => {
                        toggleConfirmDelete()
                        setDetail(data)
                    }}
                />
            )}

            {isFormPage && <LoyaltyProductForm onSubmitForm={handleSubmitForm} data={detail} form={form} />}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                isLoading={isLoadingDeleteProduct}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default LoyaltyProduct
