import dayjs from "dayjs"

//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ILoyaltyCollection, ILoyaltyCollectionItem, ILoyaltyCollectionItemForm } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//COMPONENTS
import { Button, Form, TablePaginationConfig } from "antd"
import PageWrapper from "@/components/PageWrapper"
import LoyaltyCollectionListing from "./sections/LoyaltyCollectionListing"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import LoyaltyCollectionDetail from "./sections/LoyaltyCollectionDetail"
import LoyaltyCollectionItemDetail from "./sections/LoyaltyCollectionItemDetail"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import {
    useCreateLoyaltyProductCollectionApiMutation,
    useCreateLoyaltyProductCollectionItemApiMutation,
    useDeleteLoyaltyProductCollectionApiMutation,
    useDeleteLoyaltyProductCollectionItemApiMutation,
    useGetLoyaltyProductsCollectionsApiQuery,
    useUpdateLoyaltyProductCollectionApiMutation,
    useUpdateLoyaltyProductCollectionItemApiMutation,
} from "@/services/loyaltyCollection.service"

function LoyaltyCollection() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<ILoyaltyCollection>()
    const [formCollectionItem] = Form.useForm<ILoyaltyCollectionItemForm>()
    const { showNotification } = useNotification()
    const [detail, setDetail] = useState<ILoyaltyCollection>()
    const [detailCollectionItem, setDetailCollectionItem] = useState<ILoyaltyCollectionItem>()
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()

    //SERVICES
    const {
        data,
        isLoading: isLoadingListCollections,
        isFetching: isFetchingListCollections,
        refetch: refetchListCollections,
    } = useGetLoyaltyProductsCollectionsApiQuery(pagination)

    const [updateLoyaltyCollection, { isLoading: isLoadingUpdateCollection }] =
        useUpdateLoyaltyProductCollectionApiMutation()
    const [createLoyaltyCollection, { isLoading: isLoadingCreateCollection }] =
        useCreateLoyaltyProductCollectionApiMutation()
    const [deleteLoyaltyCollection, { isLoading: isLoadingDeleteCollection }] =
        useDeleteLoyaltyProductCollectionApiMutation()

    const [createCollectionItemApi, { isLoading: isLoadingCreateCollectionItemApi }] =
        useCreateLoyaltyProductCollectionItemApiMutation()
    const [updateCollectionItemApi, { isLoading: isLoadingUpdateCollectionItemApi }] =
        useUpdateLoyaltyProductCollectionItemApiMutation()
    const [
        deleteCollectionItemApi,
        { isLoading: isLoadingDeleteCollectionItem, isSuccess: isSuccessDeleteCollectionItem },
    ] = useDeleteLoyaltyProductCollectionItemApiMutation()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            const collectionID = searchParams.get(ParamsEnum.COLLECTION_ITEM_ID)

            let detailCollection: ILoyaltyCollection = {}

            if (id) {
                detailCollection = data?.data?.find((item) => item.id === id) || {}
                if (detailCollection?.id) {
                    form.setFieldsValue({
                        ...detailCollection,
                        effective_date: [
                            dayjs(detailCollection?.effective_date_start),
                            dayjs(detailCollection?.effective_date_end),
                        ],
                    })
                    setDetail(detailCollection)
                }
            }

            if (collectionID) {
                const detailCollectionItem = detailCollection?.productCollectionItem?.find(
                    (item) => item?.id === collectionID
                )

                if (detailCollectionItem?.id) {
                    formCollectionItem.setFieldsValue({
                        ...detailCollectionItem,
                        collection_id: detail?.id,
                        product_name: detailCollectionItem?.products?.name,
                        product_ids: [detailCollectionItem?.products?.id || ""] as string[],
                    })
                    setDetailCollectionItem(detailCollectionItem)
                }
            } else {
                formCollectionItem.resetFields()
            }
        } else {
            form.resetFields()
            setDetail({})
        }
    }, [searchParams, data])

    const currentPage = useMemo(() => {
        return {
            isListCollection: !searchParams.has(ParamsEnum.ID) && !searchParams.has(ParamsEnum.COLLECTION_ITEM_ID),
            isFormCollection: searchParams.has(ParamsEnum.ID) && !searchParams.has(ParamsEnum.COLLECTION_ITEM_ID),
            isFormCollectionItem: searchParams.has(ParamsEnum.COLLECTION_ITEM_ID),
        }
    }, [searchParams])

    const handleRedirectForm = (values?: ILoyaltyCollection) => {
        if (values?.id) {
            return navigate(`${PageRoute.LoyaltyCollections}?${ParamsEnum.ID}=${values?.id}`)
        } else {
            return navigate(`${PageRoute.LoyaltyCollections}?${ParamsEnum.ID}=`)
        }
    }

    const handleSubmitForm = async (value: ILoyaltyCollection) => {
        const isEdit = detail?.id
        const payload = { ...detail, ...value }

        try {
            if (isEdit) {
                await updateLoyaltyCollection({ ...payload }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                await createLoyaltyCollection(payload).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.CreateSuccess,
                })
            }
            refetchListCollections()
            navigate(-1)
        } catch (err: any) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: err?.data?.message,
            })
        }
    }

    const hadleSubmitCollectionItemForm = async (value: ILoyaltyCollectionItemForm) => {
        const isEdit = detailCollectionItem?.id
        const payload = { ...value }

        try {
            if (isEdit) {
                await updateCollectionItemApi({
                    ...payload,
                }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                await createCollectionItemApi(payload).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.CreateSuccess,
                })
            }
            refetchListCollections()
            navigate(-1)
        } catch (err: any) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: err?.data?.message,
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

    const handleConfirmDelete = async () => {
        try {
            await deleteLoyaltyCollection({ id: detail?.id }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            toggleConfirmDelete()
            setDetail({})
            refetchListCollections()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
        }
    }

    const handleDeleteCollectionItem = async (data?: ILoyaltyCollection) => {
        try {
            await deleteCollectionItemApi({ id: data?.id }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            refetchListCollections()
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
                !currentPage.isListCollection && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button
                            loading={
                                isLoadingCreateCollection ||
                                isLoadingUpdateCollection ||
                                isLoadingCreateCollectionItemApi ||
                                isLoadingUpdateCollectionItemApi
                            }
                            icon={<SaveFilled />}
                            type="primary"
                            onClick={() =>
                                currentPage?.isFormCollectionItem ? formCollectionItem?.submit() : form?.submit()
                            }
                        >
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={!currentPage.isListCollection}
            title={currentPage.isListCollection ? "Loyalty Collection" : "Loyalty Collection Item"}
        >
            {currentPage.isListCollection && (
                <LoyaltyCollectionListing
                    data={data}
                    loading={isLoadingListCollections || isFetchingListCollections}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onPagination={handleChangePagination}
                    onDelete={(data) => {
                        toggleConfirmDelete()
                        setDetail(data)
                    }}
                />
            )}

            {currentPage.isFormCollection && (
                <LoyaltyCollectionDetail
                    onSubmitForm={handleSubmitForm}
                    form={form}
                    data={detail}
                    isSuccessDeleteCollectionItem={isSuccessDeleteCollectionItem}
                    isLoadingDeleteCollectionItem={isLoadingDeleteCollectionItem}
                    onDeleteCollectionItem={handleDeleteCollectionItem}
                />
            )}

            {currentPage.isFormCollectionItem && (
                <LoyaltyCollectionItemDetail
                    onSubmitForm={hadleSubmitCollectionItemForm}
                    form={formCollectionItem}
                    data={detailCollectionItem}
                />
            )}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                isLoading={isLoadingDeleteCollection}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default LoyaltyCollection
