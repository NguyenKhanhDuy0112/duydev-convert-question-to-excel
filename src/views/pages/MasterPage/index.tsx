//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

//MODELS
import { ICategoryType, IContent, IContentForm, ICoupon, IMasterPage, IMasterPageForm, IRequestPaging } from "@/models"

//ENUMS
import {
    ContentStatusEnum,
    ContentTypeEnum,
    MasterCateEnum,
    NotificationMessageEnum,
    NotificationTypeEnum,
    PageRoute,
    ParamsEnum,
} from "@/enums"

//CONSTANTS
import { INIT_PAGINATION, ProjectIDs, TAB_LANGS } from "@/constants"

//SERVICES
import {
    useCreateMasterPageApiMutation,
    useDeleteMasterPageApiMutation,
    useGetMasterPagesApiQuery,
    useUpdateMasterPageApiMutation,
} from "@/services/masterPage.service"
import {
    useCreateContentManagementApiMutation,
    useDeleteContentManagementApiMutation,
    useGetContentManagementMasterPageApiQuery,
    useGetContentTypeManagementApiQuery,
    useUpdateContentManagementApiMutation,
    useUpdateStatusContentManagementApiMutation,
} from "@/services/contentManagement.service"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//COMPONENTS
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import PageWrapper from "@/components/PageWrapper"
import { Button, Form, Spin } from "antd"
import MasterPageListing from "./sections/MasterPageListing"
import MasterPageForm from "./sections/MasterPageForm"
import ModalConfirm from "@/components/ModalConfirm"

function MasterPage() {
    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { visible: visibleConfirmStatus, toggle: toggleConfirmStatus } = useModal()
    const { searchParams, navigate } = useRouter()
    const { showNotification } = useNotification()

    //STATES
    const [pagination, setPagination] = useState<IRequestPaging>(INIT_PAGINATION)
    const [dataDetail, setDataDetail] = useState<IMasterPage | undefined>({})
    const [dataSubmit, setDataSubmit] = useState<IMasterPageForm>({})

    //SERVICES
    const { data: contentTypes } = useGetContentTypeManagementApiQuery()
    const {
        data: contentMasterPage,
        isLoading: isLoadingContentMasterPage,
        refetch: refetchContentMasterPage,
    } = useGetContentManagementMasterPageApiQuery(
        {
            page_id: dataDetail?.id || "",
        },
        {
            skip: !dataDetail?.id,
        }
    )

    const { data, isFetching: isFetchingList, refetch } = useGetMasterPagesApiQuery(pagination)
    const [createMasterPageApi, { isLoading: isLoadingCreate }] = useCreateMasterPageApiMutation()
    const [updateMasterPageApi, { isLoading: isLoadingUpdate }] = useUpdateMasterPageApiMutation()
    const [deleteMasterPageApi, { isLoading: isLoadingDelete }] = useDeleteMasterPageApiMutation()

    const [createContentApi, { isLoading: isLoadingCreateContent }] = useCreateContentManagementApiMutation()
    const [updateContentApi, { isLoading: isLoadingUpdateContent }] = useUpdateContentManagementApiMutation()
    const [deleteContentApi, { isLoading: isLoadingDeleteContent }] = useDeleteContentManagementApiMutation()
    const [updateStatusContentApi, { isLoading: isLoadingUpdateStatusContent }] =
        useUpdateStatusContentManagementApiMutation()

    //ANTD
    const [form] = Form.useForm()

    useEffect(() => {
        if (isFormPage) {
            const id = searchParams.get(ParamsEnum.ID)
            if (id) {
                const masterPageDetail = data?.data?.find((item) => item.id === id)
                if (masterPageDetail?.id) {
                    let items: IContent[] = []
                    Object.keys(contentMasterPage?.data || {})?.forEach((item) => {
                        items = [...items, ...(contentMasterPage?.data![item] || [])]
                    })

                    setDataDetail({
                        ...masterPageDetail,
                        status: items?.length ? items[0]?.status : ("" as ContentStatusEnum),
                    })
                    form.setFieldsValue({
                        ...masterPageDetail,
                        status: items?.length ? items[0]?.status : "",
                        items: items?.length ? items : TAB_LANGS.map((item) => ({ lang: item?.value })),
                    })
                }
            } else {
                setDataDetail({})
                form.resetFields()
            }
        }
    }, [searchParams, data])

    useEffect(() => {
        if (contentMasterPage?.data) {
            let items: IContent[] = []
            Object.keys(contentMasterPage?.data || {})?.forEach((item) => {
                items = [...items, ...(contentMasterPage?.data![item] || [])]
            })
            form.setFieldsValue({
                status: items?.length ? items[0]?.status : "",
                items: items?.length ? items : TAB_LANGS.map((item) => ({ lang: item?.value })),
            })
        }
    }, [contentMasterPage])

    const handleConfirmDelete = async () => {
        try {
            await deleteMasterPageApi(dataDetail || {}).unwrap()
            await deleteContentApi({ master_content_id: dataDetail?.id || "" })
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
        setDataDetail(data)
        toggleConfirmDelete()
    }

    const handleRedirectForm = (values?: ICategoryType) => {
        form.setFieldsValue({ ...values, status: values?.id ? values?.is_active : true })
        setDataDetail(values)
        return navigate(`${PageRoute.MasterPage}?id=${values?.id ? values?.id : ""}`)
    }

    const handleSubmitForm = async (values: IMasterPageForm, isSkipCheckStatus: boolean = false) => {
        setDataSubmit(values)
        const formValues = { ...dataDetail, ...values, project_id: ProjectIDs.Project_1 }
        const isEdit = formValues?.id

        formValues.type_id = contentTypes?.data?.find((item) => item?.name === ContentTypeEnum.PAGE)?.id || ""
        formValues.master_type = MasterCateEnum.MASTER_PAGE

        try {
            if (isEdit) {
                if (!isSkipCheckStatus && values?.status !== dataDetail?.status) {
                    toggleConfirmStatus()
                    return
                }

                const response = await updateMasterPageApi(formValues).unwrap()
                formValues.cate_type_id = response?.id || ""
                delete formValues.route
                delete formValues.name_localize
                delete formValues.name

                await updateContentApi({
                    ...formValues,
                    master_content_id: values?.items![0]?.master_content_id || "",
                } as IContentForm)

                if (values?.status !== dataDetail?.status) {
                    await updateStatusContentApi({
                        master_content_id: values?.items![0]?.master_content_id || "",
                        status: values?.status as ContentStatusEnum,
                    } as IContentForm)
                }

                refetchContentMasterPage()
            } else {
                const response = await createMasterPageApi(formValues).unwrap()
                formValues.cate_type_id = response?.id || ""
                delete formValues.route
                delete formValues.name_localize
                delete formValues.name
                await createContentApi({
                    ...formValues,
                } as IContentForm)
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

    const handleConfirmChangeStatus = (values: IMasterPageForm) => {
        toggleConfirmStatus()
        handleSubmitForm(values, true)
    }

    const isFormPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    return (
        <PageWrapper
            footer={
                isFormPage && (
                    <div className="d-flex items-center gap-4">
                        <Button onClick={() => navigate(-1)} type="dashed">
                            Cancel
                        </Button>
                        <Button
                            loading={
                                isLoadingCreate || isLoadingUpdate || isLoadingCreateContent || isLoadingUpdateContent
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
            hasBackBtn={isFormPage}
            title="Master Page"
        >
            {!isFormPage && (
                <MasterPageListing
                    data={data}
                    pagination={pagination}
                    loading={isFetchingList}
                    onActionForm={handleRedirectForm}
                    onDelete={handleToggleModalDelete}
                />
            )}

            {isFormPage && (
                <Spin spinning={isLoadingContentMasterPage}>
                    <MasterPageForm
                        form={form}
                        onSubmitForm={(value) => setTimeout(() => handleSubmitForm(value), 100)}
                    />
                </Spin>
            )}

            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                isLoading={isLoadingDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />

            <ModalConfirm
                visible={visibleConfirmStatus}
                data={dataSubmit}
                isLoading={isLoadingUpdateStatusContent}
                onClose={toggleConfirmStatus}
                title="Change status content"
                description={`Are you sure you want to change the content status to ${dataSubmit?.status}?`}
                onConfirm={handleConfirmChangeStatus}
            />
        </PageWrapper>
    )
}

export default MasterPage
