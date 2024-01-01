//HOOKS
import { useRouter } from "@/hooks"

//SERVICES
import { useGetContentManagementApiQuery } from "@/services/contentManagement.service"

//COMPONENTS
import EditContent from "./sections/EditContent/EditContent"
import PageWrapper from "@/components/PageWrapper"

function ContentManagement() {
    const {
        params: { cateTypeID },
    } = useRouter()

    const { data, refetch } = useGetContentManagementApiQuery({ cate_type_id: cateTypeID || "" }, { skip: !cateTypeID })

    return (
        <PageWrapper title="Content Management">
            <EditContent data={data?.data} refetchContent={refetch} />
        </PageWrapper>
    )
}

export default ContentManagement
