import {
    DataResponse,
    ILoyaltyCollection,
    ILoyaltyCollectionItem,
    ILoyaltyCollectionItemForm,
    IRequestPaging,
} from "@/models"
import { baseQueryLoyaltyBO } from "./baseQuery.service"
import { createApi } from "@reduxjs/toolkit/query/react"

export const loyaltyProductCollectionService = createApi({
    reducerPath: "loyaltyProductCollectionService",
    baseQuery: baseQueryLoyaltyBO,
    endpoints: (builder) => ({
        getLoyaltyProductsCollectionsApi: builder.query<DataResponse<ILoyaltyCollection[]>, IRequestPaging>({
            query: (params: IRequestPaging) => ({
                url: "/loyal-product-collection",
                params,
                method: "GET",
            }),
        }),
        createLoyaltyProductCollectionApi: builder.mutation<DataResponse<ILoyaltyCollection>, ILoyaltyCollection>({
            query: (body: ILoyaltyCollection) => ({
                url: `/loyal-product-collection`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyProductCollectionApi: builder.mutation<string, ILoyaltyCollection>({
            query: (body) => ({
                url: `/loyal-product-collection/${body.id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteLoyaltyProductCollectionApi: builder.mutation<string, ILoyaltyCollection>({
            query: (body) => ({
                url: `/loyal-product-collection/${body.id}`,
                body,
                method: "DELETE",
            }),
        }),
        createLoyaltyProductCollectionItemApi: builder.mutation<
            DataResponse<ILoyaltyCollectionItem>,
            ILoyaltyCollectionItemForm
        >({
            query: (body: ILoyaltyCollectionItemForm) => ({
                url: `/loyal-product-collection/${body?.collection_id}/collection-items`,
                body,
                method: "POST",
            }),
        }),
        updateLoyaltyProductCollectionItemApi: builder.mutation<
            DataResponse<ILoyaltyCollectionItem>,
            ILoyaltyCollectionItemForm
        >({
            query: (body: ILoyaltyCollectionItemForm) => ({
                url: `/loyal-product-collection/collection-items/${body.id}`,
                body,
                method: "PUT",
            }),
        }),
        deleteLoyaltyProductCollectionItemApi: builder.mutation<
            DataResponse<ILoyaltyCollectionItem>,
            ILoyaltyCollectionItemForm
        >({
            query: (body: ILoyaltyCollectionItemForm) => ({
                url: `/loyal-product-collection/collection-items/${body.id}`,
                body,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetLoyaltyProductsCollectionsApiQuery,
    useLazyGetLoyaltyProductsCollectionsApiQuery,

    useCreateLoyaltyProductCollectionApiMutation,

    useUpdateLoyaltyProductCollectionApiMutation,

    useDeleteLoyaltyProductCollectionApiMutation,

    useCreateLoyaltyProductCollectionItemApiMutation,

    useUpdateLoyaltyProductCollectionItemApiMutation,

    useDeleteLoyaltyProductCollectionItemApiMutation,
} = loyaltyProductCollectionService
