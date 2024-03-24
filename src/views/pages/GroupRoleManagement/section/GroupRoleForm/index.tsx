import { IPermission, IRoleUser } from "@/models"
import { Checkbox, Col, Collapse, Divider, Form, FormInstance, Input, Row, Spin } from "antd"
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
        let groupedData = permissions?.reduce((acc: any, currentItem: IPermission) => {
            const { branch } = currentItem
            if (acc[branch || ""]) {
                acc[branch || ""].push(currentItem)
            } else {
                acc[branch || ""] = [currentItem]
            }
            return acc
        }, {})

        //continue group by "group"
        groupedData = Object.keys(groupedData)?.reduce((acc: any, item: string) => {
            const group = groupedData[item]?.reduce((acc: any, currentItem: IPermission) => {
                const { group } = currentItem
                if (acc[group || ""]) {
                    acc[group || ""].push(currentItem)
                } else {
                    acc[group || ""] = [currentItem]
                }
                return acc
            }, {})
            acc[item] = group
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
                        <Divider />
                        <h2 className="fw-500">Role List</h2>
                    </Col>
                    <Col span={24}>
                        <Form.Item className="w-100" name={"permission_ids"}>
                            <Row>
                                {Object.keys(groupPermission)?.map((item, idx) => (
                                    <Col span={24}>
                                        <>
                                            <Collapse
                                                className="w-100"
                                                key={item}
                                                items={[
                                                    {
                                                        label: <span className="text-capitalize fw-600">{item}</span>,
                                                        children: (
                                                            <Checkbox.Group
                                                                className="w-100"
                                                                value={data?.permission_ids}
                                                            >
                                                                <>
                                                                    {Object.keys(groupPermission[item])?.map(
                                                                        (group, index) => {
                                                                            return (
                                                                                <div className="w-100 m-b-2">
                                                                                    <h4 className="m-b-2 text-capitalize fw-500">
                                                                                        {group}
                                                                                    </h4>
                                                                                    <Row gutter={[8, 8]}>
                                                                                        {groupPermission[item][
                                                                                            group
                                                                                        ]?.map((item: IPermission) => (
                                                                                            <Col
                                                                                                lg={{ span: 8 }}
                                                                                                md={{ span: 12 }}
                                                                                                xs={{ span: 12 }}
                                                                                                key={item.id}
                                                                                            >
                                                                                                <Checkbox
                                                                                                    className={`${item?.id}`}
                                                                                                    value={item.id}
                                                                                                    onChange={() =>
                                                                                                        onUpdatePermissionForRole(
                                                                                                            item?.id ||
                                                                                                                ""
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    {item.desc}
                                                                                                </Checkbox>
                                                                                            </Col>
                                                                                        ))}
                                                                                    </Row>
                                                                                    {Object.keys(groupPermission[item])
                                                                                        ?.length -
                                                                                        1 !==
                                                                                        index && <Divider />}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    )}
                                                                    {/* {groupPermission[item]?.map((item: IPermission) => (
                                                                   
                                                                ))} */}
                                                                </>
                                                            </Checkbox.Group>
                                                        ),
                                                    },
                                                ]}
                                            />
                                            {Object.keys(groupPermission)?.length - 1 !== idx && <Divider />}
                                        </>
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
