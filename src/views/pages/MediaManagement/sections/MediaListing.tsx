import { IMedia } from "@/models"
import { Image, List } from "antd"

interface MediaListingProps {
    data?: IMedia[]
}

function MediaListing(props: MediaListingProps) {
    const { data } = props

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Image.PreviewGroup items={[item?.path || ""]}>
                        <Image width={200} height={200} src={item?.path} />
                    </Image.PreviewGroup>
                </List.Item>
            )}
        />
    )
}

export default MediaListing
