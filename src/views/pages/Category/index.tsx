//MODELS
import { ICategory } from "@/models"

//HOOKS
import { useModal, useNotification, useRouter } from "@/hooks"
import { useMemo, useState } from "react"

//ENUMS
import { NotificationMessageEnum, NotificationTypeEnum, PageRoute, ParamsEnum } from "@/enums"

//ICONS
import { SaveFilled } from "@ant-design/icons"

//SERVICES
import { useCreateCategoryApiMutation, useGetCategoriesApiQuery } from "@/services/category.service"

//CONSTANTS
import { INIT_PAGINATION, ProjectIDs } from "@/constants"

//COMPONENTS
import { Button, Form, TablePaginationConfig } from "antd"
import ModalConfirmDelete from "@/components/ModalConfirmDelete"
import CategoryListing from "./sections/CategoryListing"
import CategoryForm from "./sections/CategoryForm"
import PageWrapper from "@/components/PageWrapper"

function Category() {
    //HOOKS
    const { visible: visibleConfirmDelete, toggle: toggleConfirmDelete } = useModal()
    const { searchParams } = useRouter()
    const { navigate } = useRouter()
    const { showNotification } = useNotification()
    const [pagination, setPagination] = useState(INIT_PAGINATION)

    const [form] = Form.useForm<ICategory>()

    //SERVICES
    const { data, isFetching, refetch } = useGetCategoriesApiQuery(pagination)
    const [createCategoryApi, { isLoading: isLoadingCreate }] = useCreateCategoryApiMutation()

    const handleConfirmDelete = () => {}

    const isFormCategoryPage = useMemo(() => {
        return searchParams.has(ParamsEnum.ID)
    }, [searchParams])

    const handleRedirectForm = (values: ICategory) => {
        form.setFieldsValue(values)
        return navigate(
            `${PageRoute.Categories}?${ParamsEnum.ID}=${values?.id}&${ParamsEnum.CATE_TYPE_ID}=${values?.cate_type_id}`
        )
    }

    const handleChangePagination = (pagination: TablePaginationConfig) => {
        setPagination((prevData) => ({
            ...prevData,
            page: Number(pagination.current) || 0,
            limit: Number(pagination.pageSize) || 0,
        }))
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
                    onPagination={handleChangePagination}
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
