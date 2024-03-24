//HOOKS
import { useNotification, useRouter } from "@/hooks"
import { useMemo, useState } from "react"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, ParamsEnum, SettingClearCacheEnum } from "@/enums"

//SERVICES
import { usePostClearCacheApiMutation, usePostClearCacheFOApiMutation } from "@/services/common.service"

//CONSTANTS
import { SETTING_CLEAR_CACHE } from "@/constants"

//MODELS
import { ISettingClearCache } from "@/models/setting.model"
import { ColumnsType } from "antd/es/table"
import { Common } from "@/models"

//ICONS
import { PlayCircleOutlined } from "@ant-design/icons"

//COMPONENTS
import PageWrapper from "@/components/PageWrapper"
import { Button, Table } from "antd"

function SettingClearCache() {
    //HOOKS
    const [detail, setDetail] = useState<ISettingClearCache>({})
    const { searchParams } = useRouter()
    const { showNotification } = useNotification()

    //SERVICES
    const [postClearCacheApi, { isLoading: isLoadingClearCacheApi }] = usePostClearCacheApiMutation()
    const [postClearCacheFrontOfficeApi, { isLoading: isLoadingClearCacheFrontOfficeApi }] =
        usePostClearCacheFOApiMutation()

    const isFormUserPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleClearCacheApi = async () => {
        try {
            await postClearCacheApi().unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.ClearCacheSuccess,
            })
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.ClearCacheError,
            })
        }
    }

    const handleClearCacheFrontOfficeApi = async () => {
        try {
            await postClearCacheFrontOfficeApi().unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.ClearCacheSuccess,
            })
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.ClearCacheError,
            })
        }
    }

    const handleClearCache = (value: ISettingClearCache) => {
        setDetail(value)
        switch (value?.type) {
            case SettingClearCacheEnum.BO:
                handleClearCacheApi()
                break
            case SettingClearCacheEnum.FO:
                handleClearCacheFrontOfficeApi()
                break
            default:
                break
        }
    }

    const columns: ColumnsType<ISettingClearCache> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => {
                return <span>{Common.renderData(value)}</span>
            },
        },
        {
            title: "Action",
            dataIndex: "type",
            key: "type",
            width: "10%",
            render: (_, record: ISettingClearCache) => {
                return (
                    <Button
                        loading={
                            detail?.id === record?.id && (isLoadingClearCacheApi || isLoadingClearCacheFrontOfficeApi)
                        }
                        onClick={() => handleClearCache(record)}
                        icon={<PlayCircleOutlined />}
                        type="primary"
                    ></Button>
                )
            },
        },
    ]

    return (
        <PageWrapper hasBackBtn={isFormUserPage} title="Clear Cache">
            <Table
                columns={columns}
                rowKey={"id"}
                scroll={{ x: "auto" }}
                loading={false}
                dataSource={SETTING_CLEAR_CACHE}
            />
        </PageWrapper>
    )
}

export default SettingClearCache
