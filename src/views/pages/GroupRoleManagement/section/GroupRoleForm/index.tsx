import { IPermission, IRoleUser } from "@/models"
import { Checkbox, Col, Form, FormInstance, Input, Row, Spin } from "antd"

interface GroupRoleFormProps {
    data: IRoleUser
    isLoading: boolean
    permissions?: IPermission[]
    form: FormInstance<IRoleUser>
    onSubmitForm: (value: IRoleUser) => void
    onUpdatePermissionForRole: (value: string[]) => void
}

function GroupRoleForm(props: GroupRoleFormProps) {
    const { data, isLoading, permissions, form, onSubmitForm, onUpdatePermissionForRole } = props

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
                    {data?.id && (
                        <Col span={24}>
                            <Form.Item label="Permissions" name={"permission_ids"}>
                                <Checkbox.Group onChange={(value) => onUpdatePermissionForRole(value as string[])}>
                                    <Row gutter={[8, 8]}>
                                        {permissions?.map((permission) => (
                                            <Col span={8} key={permission.id}>
                                                <Checkbox value={permission.id}>{permission.desc}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    )}
                </Row>
            </Form>
        </Spin>
    )
}

export default GroupRoleForm
