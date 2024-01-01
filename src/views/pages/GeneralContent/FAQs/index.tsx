import PageWrapper from "@/components/PageWrapper"
import { useModal } from "@/hooks"
import { ICategory } from "@/models"
import { useEffect, useState } from "react"
import FAQsListing from "./sections/FAQsListing"
import FAQsForm from "./sections/FAQsForm"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"

function FAQs() {
    const { visible: visibleForm, toggle: toggleForm } = useModal()
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const [data, setData] = useState<ICategory[]>([])

    useEffect(() => {
        // const newData: ICategory[] = []
        // Array.from({ length: 100 }).forEach((_, index: number) => {
        //     newData.push({
        //         id: `00${index}`,
        //         name: `Edward 00${index}`,
        //         items: [
        //             {
        //                 id: `00${index}`,
        //                 name: `Edward 00${index}`,
        //                 url: `Edward 00${index}`,
        //             },
        //         ],
        //         created_at: new Date(),
        //         updated_at: new Date(),
        //     })
        // })
        // setData(newData)
    }, [])

    const handleConfirmDelete = () => {}
    return (
        <PageWrapper title="FAQs">
            <FAQsListing data={data} onCreate={toggleForm} onDelete={(data) => toggleConfirmDelete()} />
            <FAQsForm visible={visibleForm} onClose={toggleForm} />
            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default FAQs
