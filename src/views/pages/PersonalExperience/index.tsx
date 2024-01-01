import PageWrapper from "@/components/PageWrapper"
import { useModal } from "@/hooks"
import { ICategory, ICoupon } from "@/models"
import { useEffect, useState } from "react"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import moment from "moment"
import { StatusCoupon } from "@/enums"
import PersonalExperienceListing from "./sections/PersonalExperienceListing"
import PersonalExperienceForm from "./sections/PersonalExperienceForm"

function PersonalExperience() {
    const { visible: visibleForm, toggle: toggleForm } = useModal()
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const [data, setData] = useState<ICoupon[]>([])

    useEffect(() => {
        const newData: ICoupon[] = []

        Array.from({ length: 100 }).forEach((_, index: number) => {
            newData.push({
                id: `00${index}`,
                code: `000${index}`,
                discount: 2 * (index + 1),
                name: `Edward 00${index}`,
                prefix: StatusCoupon.Off,
                expired_at: moment().add(1, "days").toDate(),
                created_at: new Date(),
                updated_at: new Date(),
            })
        })

        setData(newData)
    }, [])

    const handleConfirmDelete = () => {}
    return (
        <PageWrapper title="Personal Experience">
            <PersonalExperienceListing data={data} onCreate={toggleForm} onDelete={(data) => toggleConfirmDelete()} />
            <PersonalExperienceForm visible={visibleForm} onClose={toggleForm} />
            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default PersonalExperience
