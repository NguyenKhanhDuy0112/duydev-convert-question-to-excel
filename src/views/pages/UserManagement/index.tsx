import PageWrapper from "@/components/PageWrapper"
import { useModal, useNotification, useRouter } from "@/hooks"
import { IUser } from "@/models"
import { useEffect, useMemo, useState } from "react"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import UserManagementListing from "./sections/UserManagementListing"
import UserManagementForm from "./sections/UserManagementForm"
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"
import { Button, Form } from "antd"
import { SaveFilled } from "@ant-design/icons"
import {
    useCreateUserApiMutation,
    useGetPermissionsApiQuery,
    useGetUsersApiQuery,
    useUpdateGroupRolesForUserApiMutation,
    useUpdateUserApiMutation,
} from "@/services/user.service"
import { INIT_PAGINATION } from "@/constants"

function UserManagement() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm()
    const { showNotification } = useNotification()
    const [detailUser, setDetailUser] = useState<IUser>()

    //SERVICES
    const { data, isLoading: isLoadingListUsers, refetch: refetchListUsers } = useGetUsersApiQuery(pagination)
    const { data: dataPermissions } = useGetPermissionsApiQuery()
    const [updateGroupRoleUserApi, { isLoading: isLoadingPutGroupRoleForUser }] =
        useUpdateGroupRolesForUserApiMutation()
    const [updateUserApi, { isLoading: isLoadingUpdateUser }] = useUpdateUserApiMutation()
    const [postUserApi, { isLoading: isLoadingCreateUser }] = useCreateUserApiMutation()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const userDetail = data?.data?.find((item) => item.id === id)
                if (userDetail?.id) {
                    form.setFieldsValue({
                        ...userDetail,
                        group_ids: userDetail?.uUserGroup?.map((item) => item?.group_id),
                    })
                    setDetailUser(userDetail)
                }
            }
        } else {
            form.resetFields()
            setDetailUser({})
        }
    }, [searchParams])

    const isFormUserPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleConfirmDelete = () => {}

    const handleRedirectForm = (values?: IUser) => {
        if (values?.id) {
            return navigate(`${PageRoute.UserManagement}?id=${values?.id}`)
        } else {
            return navigate(`${PageRoute.UserManagement}?id=`)
        }
    }

    const handleSubmitForm = async (value: IUser) => {
        const isEdit = detailUser?.id
        try {
            if (isEdit) {
                // await updateUserApi({ ...detailUser, ...value }).unwrap()
                await updateGroupRoleUserApi({
                    group_ids: value?.group_ids,
                    user_id: detailUser?.id,
                }).unwrap()

                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.CreateSuccess,
                })
            } else {
                await postUserApi(value).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            }
            refetchListUsers()
            navigate(-1)
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: isEdit ? NotificationMessageEnum.UpdateError : NotificationMessageEnum.CreateError,
            })
        }
    }

    return (
        <PageWrapper
            footer={
                isFormUserPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed">Cancel</Button>
                        <Button
                            loading={isLoadingUpdateUser || isLoadingCreateUser || isLoadingPutGroupRoleForUser}
                            icon={<SaveFilled />}
                            type="primary"
                            onClick={() => form.submit()}
                        >
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={isFormUserPage}
            title="User Management"
        >
            {!isFormUserPage && (
                <UserManagementListing
                    data={data}
                    loading={isLoadingListUsers}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onDelete={(data) => toggleConfirmDelete()}
                />
            )}

            {isFormUserPage && (
                <UserManagementForm
                    onSubmitForm={handleSubmitForm}
                    data={detailUser}
                    form={form}
                    permissions={dataPermissions?.data}
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

export default UserManagement
