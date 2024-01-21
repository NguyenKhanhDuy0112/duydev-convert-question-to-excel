//HOOKS
import { useModal, useRouter } from "@/hooks"
import { useSearchParams } from "react-router-dom"
import { useEffect, useMemo, useRef } from "react"

//ENUMS
import { ParamsEnum } from "@/enums"

//SERVICES
import { useGetContentManagementApiQuery } from "@/services/contentManagement.service"

//COMPONENTS
import EditContent from "./sections/EditContent/EditContent"
import PageWrapper from "@/components/PageWrapper"
import PreviewDevice from "@/components/PreviewDevice"
import { env } from "@/constants"

function ContentManagement() {
    const {
        params: { cateTypeID },
    } = useRouter()
    const { visible, toggle } = useModal()
    const iframeDevice = useRef<any>(null)
    const [searchParams] = useSearchParams()
    const { data, refetch } = useGetContentManagementApiQuery({ cate_type_id: cateTypeID || "" }, { skip: !cateTypeID })

    useEffect(() => {
        const iframe = document.getElementById("iframeDevice") as HTMLIFrameElement
        if (iframe) {
            iframe.contentWindow?.postMessage("The user is 'bob' and the password is 'secret'", env.FO_URL)
            console.log("iframe: ", iframe)
        }
    }, [data])

    return (
        <PageWrapper title="Content Management">
            <EditContent data={data?.data} refetchContent={refetch} onViewContent={toggle} />
            <PreviewDevice ref={iframeDevice} path={`${env.FO_URL}/draft/collection`} show={visible} onClose={toggle} />
        </PageWrapper>
    )
}

export default ContentManagement
