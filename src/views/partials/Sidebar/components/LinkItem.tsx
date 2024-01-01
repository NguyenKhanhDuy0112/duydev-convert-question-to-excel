import { Link, useLocation } from "react-router-dom"

interface LinkItemProps {
    link?: string
    label: string
    isParent?: boolean
}

function LinkItem(props: LinkItemProps) {
    const { link, label, isParent } = props
    const { pathname } = useLocation()
    const isActive = link ? (pathname === link ? "active" : "") : ""

    return link ? (
        <Link className={`sidebar__link-item ${isActive} ${isParent ? "parent" : ""}`} to={link}>
            {label}
        </Link>
    ) : (
        <span className={`sidebar__link-item none-hover ${isActive} ${isParent ? "parent" : ""}`}>{label}</span>
    )
}

export default LinkItem
