import { IPermission, IRoleUser } from "@/models"
import { Checkbox, Col, Collapse, Form, FormInstance, Input, Row, Spin } from "antd"
import { useMemo } from "react"

interface GroupRoleFormProps {
    data: IRoleUser
    isLoading: boolean
    permissions?: IPermission[]
    form: FormInstance<IRoleUser>
    onSubmitForm: (value: IRoleUser) => void
    onUpdatePermissionForRole: (value: string) => void
}

function GroupRoleForm(props: GroupRoleFormProps) {
    const { data, isLoading, permissions, form, onSubmitForm, onUpdatePermissionForRole } = props

    const groupPermission = useMemo(() => {
        const groupedData = permissions?.reduce((acc: any, currentItem: IPermission) => {
            const { group, ...rest } = currentItem
            if (acc[group || ""]) {
                acc[group || ""].push(currentItem)
            } else {
                acc[group || ""] = [currentItem]
            }
            return acc
        }, {})
        return groupedData
    }, [permissions])

    return (
        <Spin spinning={isLoading}>
            <Form onFinish={onSubmitForm} labelAlign="left" autoComplete="off" layout="vertical" form={form}>
                <Row gutter={[20, 20]}>
                    <Col span={12}>
                        <Form.Item label="Name" name={"name"}>
                            <Input placeholder="Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Description" name={"description"}>
                            <Input placeholder="Description" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item className="w-100" name={"permission_ids"}>
                            <Row gutter={[16, 16]}>
                                {Object.keys(groupPermission)?.map((item) => (
                                    <Col span={24}>
                                        <Collapse
                                            className="w-100"
                                            key={item}
                                            items={[
                                                {
                                                    label: item,
                                                    children: (
                                                        <Checkbox.Group className="w-100" value={data?.permission_ids}>
                                                            <Row gutter={[8, 8]}>
                                                                {groupPermission[item]?.map((item: IPermission) => (
                                                                    <Col span={8} key={item.id}>
                                                                        <Checkbox
                                                                            className={`${item?.id}`}
                                                                            value={item.id}
                                                                            onChange={() =>
                                                                                onUpdatePermissionForRole(
                                                                                    item?.id || ""
                                                                                )
                                                                            }
                                                                        >
                                                                            {item.desc}
                                                                        </Checkbox>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Checkbox.Group>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Spin>
    )
}

export default GroupRoleForm
