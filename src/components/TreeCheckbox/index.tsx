import React, { useEffect, useState } from "react"
import { Tree } from "antd"
import type { DataNode } from "antd/es/tree"

interface TreeCheckboxProps {
    data?: DataNode[]
    onChange: (value: React.Key[]) => void
    selectedKeys?: React.Key[]
}

function TreeCheckbox(props: TreeCheckboxProps) {
    const { data, onChange, selectedKeys } = props
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

    useEffect(() => {
        if (selectedKeys) {
            setCheckedKeys(selectedKeys)
        }
    }, [selectedKeys])

    const onCheck = (keys: React.Key[]) => {
        setCheckedKeys(keys)
        onChange(keys)
    }

    return (
        <Tree
            checkable
            onCheck={(value) => onCheck(value as React.Key[])}
            checkedKeys={checkedKeys}
            treeData={data}
            checkStrictly={true}
            blockNode
            defaultExpandParent={true}
        />
    )
}

export default TreeCheckbox
