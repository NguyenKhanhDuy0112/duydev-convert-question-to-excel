import { NotificationTitleEnum, NotificationTypeEnum } from "@/enums"
import { App } from "antd"

interface INotification {
    type: NotificationTypeEnum
    message: string
}

function useNotification() {
    const { notification } = App.useApp()

    const showNotification = (data: INotification) => {
        switch (data.type) {
            case NotificationTypeEnum.Success:
                notification.success({
                    message: NotificationTitleEnum.Success,
                    description: data.message,
                })
                break
            case NotificationTypeEnum.Error:
                notification.error({
                    message: NotificationTitleEnum.Error,
                    description: data.message,
                })
                break
            case NotificationTypeEnum.Warning:
                notification.warning({
                    message: NotificationTitleEnum.Warning,
                    description: data.message,
                })
                break
            case NotificationTypeEnum.Info:
                notification.info({
                    message: NotificationTitleEnum.Info,
                    description: data.message,
                })
                break
            default:
                notification.info({
                    message: NotificationTitleEnum.Info,
                    description: data.message,
                })
                break
        }
    }

    return {
        showNotification,
    }
}

export default useNotification
