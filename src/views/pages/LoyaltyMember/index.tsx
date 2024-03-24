//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//HOOKS
import { useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ILoyaltyMember, ILoyaltyMemberForm } from "@/models"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//COMPONENTS
import { Button, Form, TablePaginationConfig } from "antd"
import PageWrapper from "@/components/PageWrapper"
import LoyaltyMemberListing from "./sections/LoyaltyMemberListing"
import LoyaltyMemberForm from "./sections/LoyaltyMemberForm"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import { useCreateMediaApiMutation } from "@/services/media.service"
import {
    useCreateLoyaltyMemberApiMutation,
    useGetLoyaltyMemberApiQuery,
    useUpdateLoyaltyMemberApiMutation,
} from "@/services/loyaltyMember.service"
import dayjs from "dayjs"

function LoyaltyProduct() {
    //STATES
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    //HOOKS
    const { searchParams, navigate } = useRouter()
    const [form] = Form.useForm<ILoyaltyMemberForm>()
    const { showNotification } = useNotification()
    const [detail, setDetail] = useState<ILoyaltyMember>()

    //SERVICES
    const {
        data,
        isLoading: isLoadingListMembers,
        isFetching: isFetchingListMembers,
        refetch: refetchListMembers,
    } = useGetLoyaltyMemberApiQuery(pagination)

    const [updateMemberApi, { isLoading: isLoadingUpdateMember }] = useUpdateLoyaltyMemberApiMutation()
    const [createMemberApi, { isLoading: isLoadingCreateMember }] = useCreateLoyaltyMemberApiMutation()
    const [uploadImageApi, { isLoading: isLoadingCreateMedia }] = useCreateMediaApiMutation()

    useEffect(() => {
        if (searchParams.has(ParamsEnum.ID)) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const detail = data?.data?.find((item) => item.id === id)
                if (detail?.id) {
                    form.setFieldsValue({
                        ...detail,
                        birthday: detail?.birthday ? dayjs(detail?.birthday) : null,
                        member_tags: detail?.memberTags?.map((item) => item.id) as string[],
                    })
                    setDetail({ ...detail })
                }
            }
        } else {
            form.resetFields()
            setDetail({})
        }
    }, [searchParams])

    const isFormPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleRedirectForm = (values?: ILoyaltyMember) => {
        if (values?.id) {
            return navigate(`${PageRoute.LoyaltyMember}?id=${values?.id}`)
        } else {
            return navigate(`${PageRoute.LoyaltyMember}?id=`)
        }
    }

    const handleSubmitForm = async (value: ILoyaltyMemberForm) => {
        const isEdit = detail?.id
        const payload = { id: detail?.id, ...value }

        try {
            if (payload?.image && typeof payload?.image !== "string") {
                try {
                    const formData = new FormData()
                    formData.append("file", payload?.image)
                    const responseImage = await uploadImageApi(formData).unwrap()
                    payload.image = responseImage?.link_url
                } catch (err) {
                    showNotification({
                        type: NotificationTypeEnum.Error,
                        message: NotificationMessageEnum.UploadError,
                    })
                }
            }

            if (isEdit) {
                await updateMemberApi({ ...payload }).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.UpdateSuccess,
                })
            } else {
                await createMemberApi(payload).unwrap()
                showNotification({
                    type: NotificationTypeEnum.Success,
                    message: NotificationMessageEnum.CreateSuccess,
                })
            }
            refetchListMembers()
            navigate(-1)
        } catch (err: any) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: err?.data?.message,
            })
        }
    }

    const handleChangePagination = (pagination: TablePaginationConfig) => {
        setPagination((prevData) => ({
            ...prevData,
            page: Number(pagination.current) || 0,
            limit: Number(pagination.pageSize) || 0,
        }))
    }

    return (
        <PageWrapper
            footer={
                isFormPage && (
                    <div className="d-flex items-center gap-4">
                        <Button type="dashed" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button
                            loading={isLoadingCreateMember || isLoadingUpdateMember || isLoadingCreateMedia}
                            icon={<SaveFilled />}
                            type="primary"
                            onClick={() => form.submit()}
                        >
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={isFormPage}
            title="Loyalty Member"
        >
            {!isFormPage && (
                <LoyaltyMemberListing
                    data={data}
                    loading={isLoadingListMembers || isFetchingListMembers}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onPagination={handleChangePagination}
                />
            )}

            {isFormPage && <LoyaltyMemberForm onSubmitForm={handleSubmitForm} form={form} />}
        </PageWrapper>
    )
}

export default LoyaltyProduct
