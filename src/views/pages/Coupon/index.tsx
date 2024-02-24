//MODELS
import { ICoupon, IRequestPaging } from "@/models"

//UTILITIES
import dayjs from "dayjs"

//HOOKS
import { useCommon, useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//SERVICES
import {
    useCreateCouponApiMutation,
    useDeleteCouponApiMutation,
    useGetCouponsApiQuery,
    useUpdateCouponApiMutation,
} from "@/services/coupon.service"
import { useCreateMediaApiMutation } from "@/services/media.service"

//CONSTANTS
import { INIT_PAGINATION } from "@/constants"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//COMPONENTS
import { Button, Form } from "antd"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import CouponListing from "./sections/CouponListing"
import CouponForm from "./sections/CouponForm"
import PageWrapper from "@/components/PageWrapper"

function Coupon() {
    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams, navigate } = useRouter()
    const { showNotification } = useNotification()
    const { languages } = useCommon()

    //STATES
    const [pagination, setPagination] = useState<IRequestPaging>(INIT_PAGINATION)
    const [couponDetail, setCouponDetail] = useState<ICoupon | undefined>({})

    //SERVICES
    const { data, isLoading: isLoadingList, refetch } = useGetCouponsApiQuery(pagination)
    const [uploadImageApi, { isLoading: isLoadingUploadImage }] = useCreateMediaApiMutation()
    const [createCouponApi, { isLoading: isLoadingCreate }] = useCreateCouponApiMutation()
    const [updateCouponApi, { isLoading: isLoadingUpdate }] = useUpdateCouponApiMutation()
    const [deleteCouponApi, { isLoading: isLoadingDelete }] = useDeleteCouponApiMutation()

    //ANTD
    const [form] = Form.useForm()

    useEffect(() => {
        if (isFormCouponPage) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const couponDetail = data?.data?.find((item) => item.id === id)
                if (couponDetail?.id) {
                    setCouponDetail(couponDetail)
                    form.setFieldsValue({
                        ...couponDetail,
                        expire_date: dayjs(couponDetail?.expire_date),
                        langs: languages?.map((item) => {
                            const lang = couponDetail?.langs?.find((lang) => lang.lang === item?.locale)
                            if (lang?.id) {
                                return lang
                            }
                            return { lang: item?.locale }
                        }),
                    })
                }
            } else {
                form.resetFields()
            }
        }
    }, [searchParams, data])

    const handleConfirmDelete = async () => {
        try {
            await deleteCouponApi(couponDetail || {}).unwrap()

            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.DeleteSuccess,
            })
            toggleConfirmDelete()
            refetch()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.DeleteError,
            })
            toggleConfirmDelete()
        }
    }

    const handleToggleModalDelete = (data?: ICoupon) => {
        setCouponDetail(data)
        toggleConfirmDelete()
    }

    const handleRedirectForm = (values?: ICoupon) => {
        form.setFieldsValue({ ...values, expire_date: dayjs(values?.expire_date) })
        setCouponDetail(values)
        return navigate(`${PageRoute.Coupons}?id=${values?.id ? values?.id : ""}`)
    }

    const handleSubmitForm = async (values: ICoupon) => {
        const formValues = {
            ...couponDetail,
            ...values,
            cate_types: values?.cate_types?.filter((item) => item),
            expire_date: dayjs(values?.expire_date).toDate(),
        }
        const isEdit = formValues?.id

        if (values?.image && typeof values?.image !== "string") {
            try {
                const formData = new FormData()
                formData.append("file", values?.image)
                const responseImage = await uploadImageApi(formData).unwrap()
                formValues.image = responseImage?.link_url
            } catch (err) {
                showNotification({
                    type: NotificationTypeEnum.Error,
                    message: NotificationMessageEnum.UploadError,
                })
            }
        }

        try {
            if (isEdit) {
                await updateCouponApi(formValues).unwrap()
            } else {
                await createCouponApi(formValues).unwrap()
            }

            showNotification({
                type: NotificationTypeEnum.Success,
                message: isEdit ? NotificationMessageEnum.UpdateSuccess : NotificationMessageEnum.CreateSuccess,
            })
            refetch()
            navigate(-1)
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: isEdit ? NotificationMessageEnum.UpdateError : NotificationMessageEnum.CreateError,
            })
        }
    }

    const isFormCouponPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    return (
        <PageWrapper
            footer={
                isFormCouponPage && (
                    <div className="d-flex items-center gap-4">
                        <Button onClick={() => navigate(-1)} type="dashed">
                            Cancel
                        </Button>
                        <Button
                            loading={isLoadingCreate || isLoadingUpdate || isLoadingUploadImage}
                            icon={<SaveFilled />}
                            type="primary"
                            onClick={() => form.submit()}
                        >
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={isFormCouponPage}
            title="Coupons"
        >
            {!isFormCouponPage && (
                <CouponListing
                    data={data}
                    isLoading={isLoadingList}
                    pagination={pagination}
                    onActionForm={handleRedirectForm}
                    onDelete={handleToggleModalDelete}
                />
            )}

            {isFormCouponPage && <CouponForm form={form} onSubmitForm={handleSubmitForm} />}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                isLoading={isLoadingDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default Coupon
