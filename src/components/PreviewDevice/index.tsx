import { DeviceTypeEnum } from "@/enums"
import { useMemo, useState } from "react"
import { CloseOutlined } from "@ant-design/icons"
import { DeviceFrameset } from "react-device-frameset"
import "react-device-frameset/styles/marvel-devices.min.css"
import "react-device-frameset/styles/device-selector.min.css"

interface IPreviewDeviceProps {
    ref: any
    show: boolean
    path: string
    onClose: () => void
}
function PreviewDevice(props: IPreviewDeviceProps) {
    const { ref, path, show, onClose } = props
    const [device, setDevice] = useState<DeviceTypeEnum>(DeviceTypeEnum.Desktop)

    const deviceName = useMemo(() => {
        switch (device) {
            case DeviceTypeEnum.Desktop:
                return {
                    name: "MacBook Pro",
                    width: 1400,
                }
            case DeviceTypeEnum.Tablet:
                return {
                    name: "iPad Mini",
                    width: 768,
                }
            case DeviceTypeEnum.Mobile:
                return {
                    name: "iPhone 8 Plus",
                    width: 390,
                }
            default:
                return {
                    name: "MacBook Pro",
                    width: 1400,
                }
        }
    }, [device])
    return (
        <div className={`previewDevice ${show ? "active" : ""}`}>
            <div className="previewDevice__wrapper">
                <div className="previewDevice__tab">
                    <button
                        onClick={() => setDevice(DeviceTypeEnum.Desktop)}
                        className={`previewDevice__tabItem ${device === DeviceTypeEnum.Desktop ? "active" : ""}`}
                    >
                        Desktop
                    </button>
                    <button
                        onClick={() => setDevice(DeviceTypeEnum.Tablet)}
                        className={`previewDevice__tabItem ${device === DeviceTypeEnum.Tablet ? "active" : ""}`}
                    >
                        Tablet
                    </button>
                    <button
                        onClick={() => setDevice(DeviceTypeEnum.Mobile)}
                        className={`previewDevice__tabItem ${device === DeviceTypeEnum.Mobile ? "active" : ""}`}
                    >
                        Mobile
                    </button>
                </div>
                <div className="previewDevice__device">
                    <DeviceFrameset device={deviceName.name as any} width={deviceName?.width} color="yellow">
                        <iframe id="iframeDevice" ref={ref} src={path} />
                    </DeviceFrameset>
                </div>
                <button onClick={onClose} className="previewDevice__close">
                    <CloseOutlined />
                </button>
            </div>
        </div>
    )
}

export default PreviewDevice
