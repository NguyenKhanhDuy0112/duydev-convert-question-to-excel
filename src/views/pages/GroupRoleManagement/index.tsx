//MODELS
import { IPermission, IRoleUser, IUser } from "@/models"

//HOOKS
import { useEffect, useMemo, useState } from "react"
import { useModal, useNotification, useRouter } from "@/hooks"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import {
    useCreateRoleApiMutation,
    useGetGroupPermissionsApiQuery,
    useGetPermissionsApiQuery,
    useUpdateGroupPermissionForRoleMutation,
    useUpdateRoleApiMutation,
} from "@/services/user.service"

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
    const { showNotification } = useNotification()
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<IRoleUser>()
    const [detailRole, setDetailRole] = useState<IRoleUser>({})

    //SERVICES
    const { data: roles, isLoading: isLoadingRoles, refetch: refetchListRoles } = useGetGroupPermissionsApiQuery()
    const { data: permissions, isLoading: isLoadingPermission } = useGetPermissionsApiQuery()
    const [updatePermissionsForRole, { isLoading: isLoadingUpdatePermissionForRole, isUninitialized }] =
        useUpdateGroupPermissionForRoleMutation()
    const [createRoleApi, { isLoading: isLoadingCreateRole }] = useCreateRoleApiMutation()
    const [updateRoleApi, { isLoading: isLoadingUpdateRole }] = useUpdateRoleApiMutation()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const roleDetail = roles?.data?.find((item: IRoleUser) => item.id === id)
                const uniqueNames = roleDetail?.permissions?.reduce((acc: IPermission[], item: IPermission) => {
                    if (!acc.some((existingItem: IPermission) => existingItem?.name === item?.name)) {
                        acc.push({ ...item })
                    }
                    return acc
                }, [])

                form.setFieldsValue({
                    ...roleDetail,
                    permission_ids: uniqueNames?.map((item) => item.id) as string[],
                })
                setDetailRole(roleDetail || {})
            }
        } else {
            form.resetFields()
            setDetailRole({})

            if (!isUninitialized) {
                refetchListRoles()
            }
        }
    }, [searchParams, roles])

    const isFormPage = useMemo(() => {
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

    const handleSubmitForm = async (value: IRoleUser) => {
        const isEdit = detailRole?.id
        try {
            if (isEdit) {
                await updateRoleApi({ ...detailRole, ...value })
            } else {
                await createRoleApi({ ...detailRole, ...value })
            }
            showNotification({
                type: NotificationTypeEnum.Success,
                message: isEdit ? NotificationMessageEnum.UpdateSuccess : NotificationMessageEnum.CreateSuccess,
            })
            refetchListRoles()
            navigate(-1)
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: isEdit ? NotificationMessageEnum.UpdateError : NotificationMessageEnum.CreateError,
            })
        }
    }

    const handleUpdatePermissionsForRole = async (value: string[]) => {
        try {
            await updatePermissionsForRole({
                id: detailRole?.id,
                permission_ids: value,
            }).unwrap()
            form.setFieldsValue({ permission_ids: value })
            showNotification({ type: NotificationTypeEnum.Success, message: NotificationMessageEnum.UpdateSuccess })
        } catch (err) {
            showNotification({ type: NotificationTypeEnum.Error, message: NotificationMessageEnum.UpdateError })
        }
    }

    return (
        <PageWrapper
            footer={
                isFormPage && (
                    <div className="d-flex items-center gap-4">
                        <Button onClick={() => navigate(-1)} type="dashed">
                            Cancel
                        </Button>
                        <Button icon={<SaveFilled />} type="primary" onClick={() => form.submit()}>
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={isFormPage}
            title="Group Role Management"
        >
            {!isFormPage && (
                <GroupRoleListing
                    isLoading={isLoadingRoles}
                    data={roles}
                    onActionForm={handleRedirectForm}
                    onDelete={handleDeleteRole}
                    pagination={pagination}
                />
            )}

            {isFormPage && (
                <GroupRoleForm
                    data={detailRole}
                    isLoading={isLoadingPermission || isLoadingUpdatePermissionForRole}
                    permissions={permissions?.data}
                    onSubmitForm={handleSubmitForm}
                    onUpdatePermissionForRole={handleUpdatePermissionsForRole}
                    form={form}
                />
            )}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default GroupRoleManagement
