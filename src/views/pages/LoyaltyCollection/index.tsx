//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ILoyaltyCollection } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//COMPONENTS
import { Button, Form, TablePaginationConfig } from "antd"
import PageWrapper from "@/components/PageWrapper"
import LoyaltyCollectionListing from "./sections/LoyaltyCollectionListing"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import LoyaltyCollectionForm from "./sections/LoyaltyCollectionForm"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import {
    useCreateLoyaltyProductCollectionApiMutation,
    useDeleteLoyaltyProductCollectionApiMutation,
    useGetLoyaltyProductsCollectionsApiQuery,
    useUpdateLoyaltyProductCollectionApiMutation,
} from "@/services/loyaltyCollection.service"
import dayjs from "dayjs"

function LoyaltyCollection() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<ILoyaltyCollection>()
    const { showNotification } = useNotification()
    const [detail, setDetail] = useState<ILoyaltyCollection>()
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

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const detail = data?.data?.find((item) => item.id === id)
                if (detail?.id) {
                    form.setFieldsValue({
                        ...detail,
                        effective_date: [dayjs(detail?.effective_date_start), dayjs(detail?.effective_date_end)],
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

    const handleRedirectForm = (values?: ILoyaltyCollection) => {
        if (values?.id) {
            return navigate(`${PageRoute.LoyaltyCollections}?id=${values?.id}`)
        } else {
            return navigate(`${PageRoute.LoyaltyCollections}?id=`)
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

    return (
        <PageWrapper
            footer={
                isFormPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button
                            loading={isLoadingCreateCollection || isLoadingUpdateCollection}
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
            title="Loyalty Collection"
        >
            {!isFormPage && (
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

            {isFormPage && <LoyaltyCollectionForm onSubmitForm={handleSubmitForm} form={form} />}

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
