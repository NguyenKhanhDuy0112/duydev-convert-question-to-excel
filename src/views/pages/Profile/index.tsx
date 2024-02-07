//MODELS
import { IUser } from "@/models"

//COMPONENTS
import ProfileForm from "./section/ProfileForm"
import { Button, Form } from "antd"
import PageWrapper from "@/components/PageWrapper"

//HOOKSs
import { useNotification, useProfile, useRouter } from "@/hooks"

//SERVICES
import { useCreateMediaApiMutation } from "@/services/media.service"
import { useLazyGetUserProfileApiQuery, useUpdateUserApiMutation } from "@/services/user.service"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum } from "@/enums"

//HOOKS
import { useEffect } from "react"
import dayjs from "dayjs"

//ICONS
import { SaveFilled } from "@ant-design/icons"

function Profile() {
    //HOOKS
    const profile = useProfile()
    const [form] = Form.useForm<IUser>()
    const { showNotification } = useNotification()
    const { navigate } = useRouter()

    //SERVICES
    const [uploadImageApi, { isLoading: isLoadingCreateMedia }] = useCreateMediaApiMutation()
    const [updateProfileApi, { isLoading: isLoadingUpdateProfile }] = useUpdateUserApiMutation()
    const [getProfileUserApi, { isLoading: isLoadingGetProfile }] = useLazyGetUserProfileApiQuery()

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

    return (
        <PageWrapper
            title="Profile Setting"
            hasBackBtn={true}
            footer={
                <div className="d-flex items-center gap-4">
                    <Button type="dashed" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button
                        loading={isLoadingGetProfile || isLoadingUpdateProfile || isLoadingCreateMedia}
                        icon={<SaveFilled />}
                        type="primary"
                        onClick={() => form.submit()}
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <ProfileForm data={profile} form={form} onSubmitForm={handleSubmitForm} />
        </PageWrapper>
    )
}

export default Profile
