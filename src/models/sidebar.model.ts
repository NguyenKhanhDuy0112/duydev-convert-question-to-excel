export interface SidebarItem {
    key: string
    link?: string
    label: string
    icon?: any
    permission?: string
    children?: SidebarItem[]
    roles?: string[]
}
