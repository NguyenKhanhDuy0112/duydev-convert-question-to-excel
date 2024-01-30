import PageWrapper from "@/components/PageWrapper"
import { useNotification, useRouter } from "@/hooks"

import { useMemo } from "react"
import { NotificationMessageEnum, NotificationTypeEnum, ParamsEnum } from "@/enums"
import { Button, Card, Col, Row } from "antd"
import { usePostClearCacheApiMutation, usePostClearCacheFOApiMutation } from "@/services/common.service"

function SettingClearCache() {
    //HOOKS
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

    return (
        <PageWrapper hasBackBtn={isFormUserPage} title="Clear Cache">
            <Row gutter={[16, 16]}>
                <Col lg={{ span: 8 }} md={{ span: 12 }} xs={{ span: 24 }}>
                    <Card>
                        <h1 className="text-center m-b-8">Clear cache API</h1>
                        <div className="d-flex justify-center items-center">
                            <Button loading={isLoadingClearCacheApi} onClick={handleClearCacheApi} type="primary">
                                Clear
                            </Button>
                        </div>
                    </Card>
                </Col>
                <Col lg={{ span: 8 }} md={{ span: 12 }} xs={{ span: 24 }}>
                    <Card>
                        <h1 className="text-center m-b-8">Clear cache Front Office</h1>
                        <div className="d-flex justify-center items-center">
                            <Button
                                loading={isLoadingClearCacheFrontOfficeApi}
                                type="primary"
                                onClick={handleClearCacheFrontOfficeApi}
                            >
                                Clear
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </PageWrapper>
    )
}

export default SettingClearCache
