//COMPONENTS
import { Button, Divider, Input, InputRef, Select, Space } from "antd"

//HOOKS
import { useEffect, useRef, useState } from "react"

//ICONS
import { PlusOutlined } from "@ant-design/icons"

//MODELS
import { SelectOption } from "@/models"

interface SelectAddItemProps {
    options: SelectOption[]
    value: string
    onChange?: (value: string) => void
}

function SelectAddItem(props: SelectAddItemProps) {
    const { options, onChange, value } = props
    const [items, setItems] = useState(options)
    const [name, setName] = useState(value)
    const inputRef = useRef<InputRef>(null)

    useEffect(() => {
        setName(value)
    }, [value])

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        if (onChange) {
            onChange(event.target.value as string)
        }
    }

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault()
        setItems([...items, { label: name, value: name }])
        setName("")
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    return (
        <Select
            className="w-100"
            placeholder="Select"
            value={value}
            onChange={(value) => onChange && onChange(value as string)}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Add item
                        </Button>
                    </Space>
                </>
            )}
            options={items.map((item) => ({ label: item?.label, value: item?.value }))}
        />
    )
}

export default SelectAddItem
