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
    useGetGroupPermissionsApiQuery,
    useGetUsersApiQuery,
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
    const { data, isLoading: isLoadingListUsers, refetch: refetchListUsers } = useGetUsersApiQuery(pagination)
    const { data: roles } = useGetGroupPermissionsApiQuery()
    const [updateGroupRoleUserApi, { isLoading: isLoadingPutGroupRoleForUser, isUninitialized }] =
        useUpdateGroupRolesForUserApiMutation()
    const [updateUserApi, { isLoading: isLoadingUpdateUser }] = useUpdateUserApiMutation()
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
        const payload = { ...value }

        try {
            if (typeof payload?.image !== "string" && payload?.image) {
                const resImage = await uploadImageApi(payload?.image?.file?.originFileObj as File).unwrap()
                payload.image = resImage?.link_url
            }

            if (isEdit) {
                await updateUserApi({ ...detailUser, ...payload }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                await postUserApi(payload).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.CreateSuccess,
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

    return (
        <PageWrapper
            footer={
                isFormUserPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed">Cancel</Button>
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
                    loading={isLoadingListUsers}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onSetStatusUser={handleUpdateStatusUser}
                    onDelete={(data) => toggleConfirmDelete()}
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
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default UserManagement
