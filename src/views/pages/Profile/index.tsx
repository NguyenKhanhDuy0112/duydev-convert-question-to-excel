//MODELS
import { IUser, IUserChangePasswordForm } from "@/models"

//COMPONENTS
import ProfileForm from "./section/ProfileForm"
import { Button, Form, Tabs } from "antd"
import PageWrapper from "@/components/PageWrapper"

//HOOKSs
import { useNotification, useProfile, useRouter } from "@/hooks"

//SERVICES
import { useCreateMediaApiMutation } from "@/services/media.service"
import {
    useChangePasswordUserApiMutation,
    useLazyGetUserProfileApiQuery,
    useUpdateUserApiMutation,
} from "@/services/user.service"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum } from "@/enums"

//HOOKS
import { useEffect, useState } from "react"
import dayjs from "dayjs"

//ICONS
import { SaveFilled } from "@ant-design/icons"
import ProfileChangePassword from "./section/ProfileChangePassword"

function Profile() {
    //HOOKS
    const profile = useProfile()
    const [form] = Form.useForm<IUser>()
    const [formChangePassword] = Form.useForm<IUserChangePasswordForm>()
    const { showNotification } = useNotification()
    const { navigate } = useRouter()
    const [currentTab, setCurrentTab] = useState<string>("1")

    //SERVICES
    const [uploadImageApi, { isLoading: isLoadingCreateMedia }] = useCreateMediaApiMutation()
    const [updateProfileApi, { isLoading: isLoadingUpdateProfile }] = useUpdateUserApiMutation()
    const [getProfileUserApi, { isLoading: isLoadingGetProfile }] = useLazyGetUserProfileApiQuery()
    const [changePasswordApi, { isLoading: isLoadingChangePassword }] = useChangePasswordUserApiMutation()

    useEffect(() => {
        form.setFieldsValue({ ...profile, birthday: dayjs(profile?.birthday) })
    }, [profile])

    const handleSubmitForm = async (value: IUser) => {
        const payload = { ...value }

        try {
            if (typeof payload?.image !== "string" && payload?.image) {
                const formData = new FormData()
                formData.append("file", payload?.image?.file?.originFileObj as File)
                const resImage = await uploadImageApi(formData).unwrap()
                payload.image = resImage?.link_url
            }

            await updateProfileApi({ ...profile, ...payload }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.UpdateSuccess,
            })
            getProfileUserApi()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.UpdateError,
            })
        }
    }

    const handleChangePassword = async (value: IUserChangePasswordForm) => {
        try {
            await changePasswordApi(value).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.ChangePasswordSuccess,
            })
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.ChangePasswordError,
            })
        }
    }

    return (
        <PageWrapper
            title="Profile Setting"
            footer={
                <div className="d-flex items-center gap-4">
                    <Button type="dashed" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button
                        loading={
                            isLoadingGetProfile ||
                            isLoadingUpdateProfile ||
                            isLoadingCreateMedia ||
                            isLoadingChangePassword
                        }
                        icon={<SaveFilled />}
                        type="primary"
                        onClick={() => (currentTab === "1" ? form.submit() : formChangePassword.submit())}
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <Tabs
                accessKey={currentTab}
                onChange={(key) => setCurrentTab(key)}
                items={[
                    {
                        key: "1",
                        label: "Profile",
                        children: <ProfileForm data={profile} form={form} onSubmitForm={handleSubmitForm} />,
                    },
                    {
                        key: "2",
                        label: "Security",
                        children: (
                            <ProfileChangePassword form={formChangePassword} onSubmitForm={handleChangePassword} />
                        ),
                    },
                ]}
            />
        </PageWrapper>
    )
}

export default Profile
