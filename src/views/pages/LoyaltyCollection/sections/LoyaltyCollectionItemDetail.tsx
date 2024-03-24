import { ILoyaltyCollectionItem, ILoyaltyCollectionItemForm } from "@/models"
import { FormInstance } from "antd"
import { useRouter } from "@/hooks"
import { ParamsEnum } from "@/enums"
import LoyaltyCollectionItemForm from "../components/LoyaltyCollectionItemForm"

interface LoyaltyCollectionItemDetailProps {
    data?: ILoyaltyCollectionItem
    form: FormInstance<ILoyaltyCollectionItemForm>
    onSubmitForm: (value: ILoyaltyCollectionItemForm) => void
}

function LoyaltyCollectionItemDetail(props: LoyaltyCollectionItemDetailProps) {
    const { form, onSubmitForm } = props

    const { searchParams } = useRouter()

    const handleSubmitForm = (value: ILoyaltyCollectionItemForm) => {
        onSubmitForm({
            collection_id: searchParams?.get(ParamsEnum.ID) || "",
            id: searchParams?.get(ParamsEnum.COLLECTION_ITEM_ID) || "",
            ...value,
        })
    }

    return (
        <>
            <LoyaltyCollectionItemForm form={form} onSubmitForm={handleSubmitForm} />
        </>
    )
}

export default LoyaltyCollectionItemDetail
