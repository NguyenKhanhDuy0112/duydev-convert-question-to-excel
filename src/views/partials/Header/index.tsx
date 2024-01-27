import { Avatar, Button, Dropdown, Layout, MenuProps, Select, theme } from "antd"
import { useRouter } from "@/hooks"
import { PageRoute } from "@/enums"
import { useGetCategoriesApiQuery } from "@/services/category.service"
import { INIT_PAGINATION } from "@/constants"
import { useDispatch } from "react-redux"
import { MenuOutlined } from "@ant-design/icons"
import { logout } from "@/redux/modules/auth/authSlice"

const { Header: HeaderAntd } = Layout

const { Option } = Select

interface HeaderProps {
    collapsed: boolean
    onCollapsed: (collapsed: boolean) => void
}

function Header(props: HeaderProps) {
    const { collapsed, onCollapsed } = props
    const dispatch = useDispatch()

    //ANTD
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const { pathname, navigate } = useRouter()

    //SERVICES
    const { data } = useGetCategoriesApiQuery(INIT_PAGINATION)

    const items: MenuProps["items"] = [
        {
            label: "Logout",
            key: "3",
            style: { minWidth: "150px" },
            onClick: () => handleLogout(),
        },
    ]

    const handleLogout = () => {
        navigate(PageRoute.Login)
        dispatch(logout())
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
                <article className="header__profile">
                    <Avatar size={40} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                </article>
            </Dropdown>
        </HeaderAntd>
    )
}

export default Header
