import { Avatar, Button, Dropdown, Layout, MenuProps, Select } from "antd"
import { useProfile, useRouter } from "@/hooks"
import { PageRoute } from "@/enums"
import { useDispatch } from "react-redux"
import { MenuOutlined, DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { logout } from "@/redux/modules/auth/authSlice"

const { Header: HeaderAntd } = Layout

const { Option } = Select

interface HeaderProps {
    collapsed: boolean
    onCollapsed: (collapsed: boolean) => void
}

function Header(props: HeaderProps) {
    const { collapsed, onCollapsed } = props

    //HOOKS
    const { pathname, navigate } = useRouter()
    const dispatch = useDispatch()
    const profileUser = useProfile()

    const items: MenuProps["items"] = [
        {
            label: "Profile",
            key: "2",
            icon: <UserOutlined />,
            style: { minWidth: "150px" },
            onClick: () => navigate(PageRoute.Profile),
        },
        {
            label: "Logout",
            key: "3",
            icon: <LogoutOutlined />,
            style: { minWidth: "150px" },
            onClick: () => handleLogout(),
        },
    ]

    const handleLogout = () => {
        navigate(PageRoute.Login)
        dispatch(logout())
        window.location.reload()
    }

    return (
        <HeaderAntd className={`header ${!collapsed ? "active" : ""}`}>
            {pathname === PageRoute.ContentManagements ? (
                <Select className="header__select" placeholder="Select category" defaultValue={"Category 1"}>
                    <Option key={"default"}>Default</Option>
                    <Option key={"Category 1"}>Category 1</Option>
                    <Option key={"Category 2"}>Category 2</Option>
                    <Option key={"Category 3"}>Category 3</Option>
                    <Option key={"Category 4"}>Category 4</Option>
                </Select>
            ) : (
                <div>
                    <Button type="text" className="header__menu-toggle" onClick={() => onCollapsed(!collapsed)}>
                        <MenuOutlined />
                    </Button>
                </div>
            )}
            <Dropdown menu={{ items }} trigger={["click"]}>
                <button className="header__profile">
                    <Avatar
                        size={30}
                        className="header__profile-avatar"
                        src={`${
                            profileUser?.image
                                ? profileUser?.image
                                : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                        }`}
                    />
                    <h2 className="header__profile-name">
                        {profileUser?.first_name || ""} {profileUser?.last_name}
                    </h2>
                    <span className="header__profile-arrow">
                        <DownOutlined />
                    </span>
                </button>
            </Dropdown>
        </HeaderAntd>
    )
}

export default Header
