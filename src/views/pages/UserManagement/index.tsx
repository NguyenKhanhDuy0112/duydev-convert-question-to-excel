import dayjs from "dayjs"

//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { IUser } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//COMPONENTS
import { Button, Form } from "antd"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import UserManagementListing from "./sections/UserManagementListing"
import UserManagementForm from "./sections/UserManagementForm"
import PageWrapper from "@/components/PageWrapper"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import {
    useCreateUserApiMutation,
    useDeleteUserApiMutation,
    useGetGroupPermissionsApiQuery,
    useGetUsersApiQuery,
    useResetPasswordUserApiMutation,
    useUpdateGroupRolesForUserApiMutation,
    useUpdateUserApiMutation,
} from "@/services/user.service"
import { useCreateMediaApiMutation } from "@/services/media.service"

function UserManagement() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<IUser>()
    const { showNotification } = useNotification()
    const [detailUser, setDetailUser] = useState<IUser>()

    //SERVICES
    const {
        data,
        isLoading: isLoadingListUsers,
        isFetching: isFetchingListUsers,
        refetch: refetchListUsers,
    } = useGetUsersApiQuery(pagination)
    const { data: roles } = useGetGroupPermissionsApiQuery()
    const [updateGroupRoleUserApi, { isLoading: isLoadingPutGroupRoleForUser, isUninitialized }] =
        useUpdateGroupRolesForUserApiMutation()
    const [updateUserApi, { isLoading: isLoadingUpdateUser }] = useUpdateUserApiMutation()
    const [deleteUserApi, { isLoading: isLoadingDeleteUserApi }] = useDeleteUserApiMutation()
    const [resetPasswordApi, { isLoading: isLoadingResetPassword }] = useResetPasswordUserApiMutation()
    const [postUserApi, { isLoading: isLoadingCreateUser }] = useCreateUserApiMutation()
    const [uploadImageApi, { isLoading: isLoadingCreateMedia }] = useCreateMediaApiMutation()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const userDetail = data?.data?.find((item) => item.id === id)
                if (userDetail?.id) {
                    form.setFieldsValue({
                        ...userDetail,
                        birthday: userDetail?.birthday ? dayjs(userDetail?.birthday) : null,
                        group_ids: userDetail?.uUserGroup?.map((item) => item?.group_id) as string[],
                    })
                    setDetailUser(userDetail)
                }
            }
        } else {
            form.resetFields()
            setDetailUser({})
            if (!isUninitialized) {
                refetchListUsers()
            }
        }
    }, [searchParams])

    const isFormUserPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleRedirectForm = (values?: IUser) => {
        if (values?.id) {
            return navigate(`${PageRoute.UserManagement}?id=${values?.id}`)
        } else {
            return navigate(`${PageRoute.UserManagement}?id=`)
        }
    }

    const handleSubmitForm = async (value: IUser) => {
        const isEdit = detailUser?.id
        const payload = { ...value }

        try {
            if (typeof payload?.image !== "string" && payload?.image) {
                const formData = new FormData()
                formData.append("file", payload?.image?.file?.originFileObj as File)
                const resImage = await uploadImageApi(formData).unwrap()
                payload.image = resImage?.link_url
            }

            if (isEdit) {
                await updateUserApi({ ...detailUser, ...payload }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                const res = await postUserApi(payload).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: `Password: ${res?.genPass}`,
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

    const handleConfirmDelete = async () => {
        try {
            await deleteUserApi({ id: detailUser?.id }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            toggleConfirmDelete()
            setDetailUser({})
            refetchListUsers()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
        }
    }

    const handleUpdateRoleUser = async (value: string[]) => {
        try {
            await updateGroupRoleUserApi({
                group_ids: value,
                user_id: detailUser?.id,
            }).unwrap()

            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.UpdateSuccess,
            })
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.UpdateError,
            })
        }
    }

    const handleUpdateStatusUser = async (value: IUser) => {
        try {
            await updateUserApi({ ...detailUser, ...value }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.UpdateSuccess,
            })
            refetchListUsers()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.UpdateError,
            })
        }
    }

    const handleResetPassword = async (user: IUser) => {
        try {
            const res = await resetPasswordApi({ ...user }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: `Password: ${res?.genPass}`,
            })
            refetchListUsers()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.ResetPasswordError,
            })
        }
    }

    return (
        <PageWrapper
            footer={
                isFormUserPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button
                            loading={
                                isLoadingUpdateUser ||
                                isLoadingCreateUser ||
                                isLoadingPutGroupRoleForUser ||
                                isLoadingCreateMedia
                            }
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
                    loading={isLoadingListUsers || isFetchingListUsers || isLoadingResetPassword}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onSetStatusUser={handleUpdateStatusUser}
                    onDelete={(data) => {
                        toggleConfirmDelete()
                        setDetailUser(data)
                    }}
                    onResetPassword={handleResetPassword}
                />
            )}

            {isFormUserPage && (
                <UserManagementForm
                    onSubmitForm={handleSubmitForm}
                    onUpdateRoleUser={handleUpdateRoleUser}
                    data={detailUser}
                    form={form}
                    roles={roles?.data}
                />
            )}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                isLoading={isLoadingDeleteUserApi}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default UserManagement
