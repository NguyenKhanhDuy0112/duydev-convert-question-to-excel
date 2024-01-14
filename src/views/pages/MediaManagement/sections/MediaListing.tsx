//MODELS
import { IMedia } from "@/models"

//COMPONENTSs
import { Row, Button, Image, Col, Spin } from "antd"

//HOOKS
import { useState } from "react"

//ICONS
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons"

interface MediaListingProps {
    loading?: boolean
    data?: IMedia[]
    onDelete: (data?: IMedia) => void
}

function MediaListing(props: MediaListingProps) {
    const { loading, data, onDelete } = props
    const [previewVisible, setPreviewVisible] = useState<string>("")

    const handleViewAction = (item: IMedia) => {
        setPreviewVisible(item?.path || "")
    }

    const handleDeleteAction = (e: React.MouseEvent<HTMLElement>, item: IMedia) => {
        e.stopPropagation()
        onDelete(item)
    }

    return (
        <Spin spinning={loading}>
            <Row gutter={[12, 12]}>
                {data?.map((item, index) => {
                    return (
                        <Col xl={{ span: 4 }} lg={{ span: 6 }} md={{ span: 12 }} sm={{ span: 24 }} key={index}>
                            <Image
                                className="media__img"
                                src={item.path}
                                alt={item?.originalname}
                                onClick={() => handleViewAction(item)}
                                preview={{
                                    visible: item?.path === previewVisible,
                                    onVisibleChange: (visible) => setPreviewVisible(visible ? item?.path || "" : ""),
                                    mask: (
                                        <div>
                                            <Button type="text" onClick={() => handleViewAction(item)}>
                                                <EyeOutlined sizes="30" style={{ color: "#fff" }} />
                                            </Button>
                                            <Button type="text" onClick={(e) => handleDeleteAction(e, item)}>
                                                <DeleteOutlined style={{ color: "#fff" }} />
                                            </Button>
                                        </div>
                                    ),
                                }}
                            />
                        </Col>
                    )
                })}
            </Row>
            {/* <Pagination total={85} showSizeChanger showQuickJumper /> */}
        </Spin>
    )
}

export default MediaListing
