//MODELS
import { IRoleUser, IUser } from "@/models"

//HOOKS
import { useEffect, useMemo, useState } from "react"
import { useModal, useRouter } from "@/hooks"

//ENUMS
import { PageRoute, ParamsEnum } from "@/enums"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import { useGetGroupRolesApiQuery } from "@/services/user.service"

//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//COMPONENTS
import { Button, Form } from "antd"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import GroupRoleListing from "./section/GroupRoleListing"
import GroupRoleForm from "./section/GroupRoleForm"

function GroupRoleManagement() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<IRoleUser>()

    //SERVICES
    const { data: roles, isLoading: isLoadingRoles } = useGetGroupRolesApiQuery()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const roleDetail = roles?.data?.find((item) => item.id === id)
                form.setFieldsValue({ ...roleDetail })
            }
        } else {
            form.resetFields()
        }
    }, [searchParams])

    const isFormUserPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleConfirmDelete = () => {}

    const handleRedirectForm = (values?: IUser) => {
        if (values?.id) {
            return navigate(`${PageRoute.GroupRoleManagement}?${ParamsEnum.ID}=${values?.id}`)
        } else {
            return navigate(`${PageRoute.GroupRoleManagement}?${ParamsEnum.ID}=`)
        }
    }

    const handleDeleteRole = (role?: IRoleUser) => {}

    const handleSubmitForm = (value: IUser) => {
        console.log("value: ", value)
    }

    return (
        <PageWrapper
            footer={
                isFormUserPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed">Cancel</Button>
                        <Button icon={<SaveFilled />} type="primary" onClick={() => form.submit()}>
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={isFormUserPage}
            title="Group Role Management"
        >
            <GroupRoleListing
                isLoading={isLoadingRoles}
                data={roles}
                onActionForm={handleRedirectForm}
                onDelete={handleDeleteRole}
                pagination={pagination}
            />

            {/* <GroupRoleForm form={form} /> */}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default GroupRoleManagement
