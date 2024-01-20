//HOOKS
import { useEffect, useMemo, useState } from "react"
import { useProfile, useRouter } from "@/hooks"

//CONSTANTS
import { SIDE_BARS } from "@/constants/sidebar.constant"

//MODELS
import { SidebarItem } from "@/models"
import { MenuProps } from "rc-menu"

//ICONS
import LogoIc from "@/assets/icons/logo.svg"

//COMPONENTS
import LinkItem from "./components/LinkItem"
import { Layout, Menu } from "antd"

type MenuItem = Required<MenuProps>["items"][number]

const { Sider } = Layout

interface SidebarProps {
    collapsed: boolean
}

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}

function Sidebar(props: SidebarProps) {
    const { collapsed } = props
    const [defaultSelectedKey, setDefaultSelectedKey] = useState<string>("")
    const [keys, setKeys] = useState<any>()
    const { permissions, groups } = useProfile()
    const { pathname } = useRouter()

    useEffect(() => {
        const key = keys.find((item: any) => item.link === pathname)
        if (key?.key) {
            setDefaultSelectedKey(key.key)
        }
    }, [pathname, keys])

    const itemsMenu: MenuItem[] = useMemo(() => {
        const menus: any = []
        const keysItem: any = []
        const mapPermissions = permissions?.map((item) => item?.name)
        const role = groups?.find((item) => item?.name)?.name || ""
        if (mapPermissions && mapPermissions?.length > 0) {
            SIDE_BARS.forEach((option: SidebarItem) => {
                if (option.children) {
                    const itemsChildren = option.children
                        .filter(
                            (item: SidebarItem) =>
                                mapPermissions.includes(item?.permission || "") && item?.roles?.includes(role)
                        )
                        .map((item) => {
                            if (item.link === pathname) {
                                setDefaultSelectedKey(item.key)
                            }
                            keysItem.push({
                                key: item.key,
                                link: item.link,
                            })

                            return getItem(<LinkItem label={item.label} key={item.key} link={item?.link} />, item.key)
                        })

                    if (itemsChildren.length > 0) {
                        const itemParent = getItem(
                            <LinkItem isParent label={option.label} key={option.key} link={option?.link} />,
                            option.key,
                            <option.icon />,

                            itemsChildren
                        )
                        menus.push(itemParent)
                    }
                } else {
                    if (mapPermissions.includes(option.permission || "") || option.permission === "") {
                        if (option.link === pathname) {
                            keysItem.push({
                                key: option.key,
                                link: option.link,
                            })
                            setDefaultSelectedKey(option.key)
                        }
                        const itemParent = getItem(
                            <LinkItem isParent label={option.label} key={option.key} link={option?.link} />,
                            option.key,
                            <option.icon />
                        )
                        menus.push(itemParent)
                    }
                }
            })
        }

        setKeys(keysItem)

        return menus
    }, [permissions])

    return (
        <Sider width={250} className="sidebar" theme="light" trigger={null} collapsible collapsed={collapsed}>
            <div className="sidebar__logo">
                <LogoIc />
            </div>
            <Menu
                selectedKeys={[defaultSelectedKey]}
                mode="inline"
                items={itemsMenu}
                onSelect={(value) => setDefaultSelectedKey(value.key)}
            />
        </Sider>
    )
}

export default Sidebar
