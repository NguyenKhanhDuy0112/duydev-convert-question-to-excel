import PageWrapper from "@/components/PageWrapper"
import MediaListing from "./sections/MediaListing"
import MediaForm from "./sections/MediaForm"
import { useModal } from "@/hooks"
import { Button, Col, Row } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useGetMediaApiQuery } from "@/services/media.service"

function MediaManagement() {
    const { visible: visibleModalForm, toggle: toggleModalForm } = useModal()
    const { data, refetch } = useGetMediaApiQuery()

    const handleSubmitForm = () => {
        refetch()
    }

    return (
        <PageWrapper title="Media Management">
            <Row justify={"space-between"}>
                <Col span={6}></Col>
                <Col xl={{ span: 3 }} lg={{ span: 4 }} xs={{ span: 6 }}>
                    <Button onClick={toggleModalForm} icon={<PlusOutlined />} className="w-100" type="primary">
                        Upload
                    </Button>
                </Col>
            </Row>
            <MediaListing data={data?.data} />
            <MediaForm show={visibleModalForm} onClose={toggleModalForm} onSubmitForm={handleSubmitForm} />
        </PageWrapper>
    )
}

export default MediaManagement
