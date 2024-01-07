import PageWrapper from "@/components/PageWrapper"
import { ICategory } from "@/models"
import { useMemo } from "react"
import CategoryListing from "./sections/CategoryListing"
import CategoryForm from "./sections/CategoryForm"
import { useModal, useNotification, useRouter } from "@/hooks"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"
import { Button, Form } from "antd"
import { SaveFilled } from "@ant-design/icons"
import { useCreateCategoryApiMutation, useGetCategoriesApiQuery } from "@/services/category.service"
import { INIT_PAGINATION, ProjectIDs } from "@/constants"

function Category() {
    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams } = useRouter()
    const { navigate } = useRouter()
    const { showNotification } = useNotification()

    const [form] = Form.useForm<ICategory>()

    //SERVICES
    const { data, isFetching, refetch } = useGetCategoriesApiQuery(INIT_PAGINATION)
    const [createCategoryApi, { isLoading: isLoadingCreate }] = useCreateCategoryApiMutation()

    const handleConfirmDelete = () => {}

    const isFormCategoryPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleRedirectForm = (values: ICategory) => {
        console.log("values: ", values)
        form.setFieldsValue(values)
        return navigate(
            `${PageRoute.Categories}?${ParamsEnum.ID}=${values?.id}&${ParamsEnum.CATE_TYPE_ID}=${values?.cate_type_id}`
        )
    }

    const handleSubmitForm = async (values: ICategory) => {
        try {
            await createCategoryApi({ ...values, project_id: ProjectIDs.Project_1 }).unwrap()
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.CreateSuccess,
            })
            navigate(-1)
            refetch()
        } catch (err) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.CreateError,
            })
        }
    }

    return (
        <PageWrapper
            footer={
                isFormCategoryPage && (
                    <div className="d-flex items-center gap-4">
                        <Button onClick={() => navigate(-1)} type="dashed">
                            Cancel
                        </Button>
                        <Button
                            loading={isLoadingCreate}
                            icon={<SaveFilled />}
                            type="primary"
                            onClick={() => form.submit()}
                        >
                            Save
                        </Button>
                    </div>
                )
            }
            hasBackBtn={isFormCategoryPage}
            title="Category"
        >
            {!isFormCategoryPage && (
                <CategoryListing
                    data={data}
                    isLoading={isFetching}
                    onActionForm={handleRedirectForm}
                    onDelete={(data) => toggleConfirmDelete()}
                />
            )}

            {isFormCategoryPage && <CategoryForm form={form} onSubmitForm={handleSubmitForm} />}
            <ModalConfirmDelete
                visible={visibleConfirmDelete}
                onClose={toggleConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </PageWrapper>
    )
}

export default Category
