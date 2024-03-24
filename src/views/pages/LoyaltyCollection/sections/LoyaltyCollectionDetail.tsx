import { ILoyaltyCollection, ILoyaltyCollectionItem } from "@/models"
import { Divider, FormInstance } from "antd"
import LoyaltyCollectionItemsListing from "../components/LoyaltyCollectionItemsListing"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import { useModal, useRouter } from "@/hooks"
import { useEffect, useState } from "react"
import LoyaltyCollectionForm from "../components/LoyaltyCollectionForm"
import { ParamsEnum } from "@/enums"

interface LoyaltyCollectionDetailProps {
    data?: ILoyaltyCollection
    form: FormInstance<ILoyaltyCollection>
    isLoadingDeleteCollectionItem: boolean
    isSuccessDeleteCollectionItem: boolean
    onDeleteCollectionItem: (data?: ILoyaltyCollectionItem) => void
    onSubmitForm: (value: ILoyaltyCollection) => void
}

function LoyaltyCollectionDetail(props: LoyaltyCollectionDetailProps) {
    const {
        data,
        isSuccessDeleteCollectionItem,
        form,
        onSubmitForm,
        isLoadingDeleteCollectionItem,
        onDeleteCollectionItem,
    } = props
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete, hide: hideConfirmDelete } = useModal()
    const [detail, setDetail] = useState<ILoyaltyCollectionItem>()
    const { searchParams, setSearchParams } = useRouter()

    useEffect(() => {
        if (isSuccessDeleteCollectionItem) {
            hideConfirmDelete()
        }
    }, [isSuccessDeleteCollectionItem])

    const handleRedirectForm = (data: ILoyaltyCollectionItem) => {
        setSearchParams({
            [ParamsEnum.ID]: searchParams.get(ParamsEnum.ID) || "",
            [ParamsEnum.COLLECTION_ITEM_ID]: data?.id || "",
        })
    }

    return (
        <>
            <LoyaltyCollectionForm form={form} onSubmitForm={onSubmitForm} />
            <Divider />
            <LoyaltyCollectionItemsListing
                data={data?.productCollectionItem || []}
                loading={false}
                onActionForm={handleRedirectForm}
                onDelete={(data) => {
                    toggleConfirmDelete()
                    setDetail(data)
                }}
            />
            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                isLoading={isLoadingDeleteCollectionItem}
                onConfirm={() => onDeleteCollectionItem(detail)}
            />
        </>
    )
}

export default LoyaltyCollectionDetail
