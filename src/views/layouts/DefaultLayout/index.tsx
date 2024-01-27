import Header from "@/views/partials/Header"
import Sidebar from "@/views/partials/Sidebar"
import { Layout } from "antd"
import { ReactNode, useState } from "react"

const { Content } = Layout

interface DefaultLayoutProps {
    children: ReactNode
}

function DefaultLayout(props: DefaultLayoutProps) {
    const { children } = props
    const [collapsed, setCollapsed] = useState<boolean>(false)

    return (
        <Layout hasSider className="defaultLayout">
            <Sidebar onCollapse={() => setCollapsed(!collapsed)} collapsed={collapsed} />
            <Layout className="defaultLayout__wrapper">
                <Header collapsed={collapsed} onCollapsed={setCollapsed} />
                <Content className={`defaultLayout__content ${!collapsed ? "active" : ""}`}>{children}</Content>
            </Layout>
        </Layout>
    )
}

export default DefaultLayout
