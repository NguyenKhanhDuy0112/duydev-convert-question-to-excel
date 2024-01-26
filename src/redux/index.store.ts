import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./modules"
import { auditService } from "@/services/audit.service"
import { userService } from "@/services/user.service"
import { authService } from "@/services/auth.service"
import { categoryService } from "@/services/category.service"
import { couponService } from "@/services/coupon.service"
import { contentTypeService } from "@/services/contentType.service"
import { contentManagementService } from "@/services/contentManagement.service"
import { contentDetailManagementService } from "@/services/contentDetailManagement.service"
import { mediaService } from "@/services/media.service"
import { masterPageService } from "@/services/masterPage.service"
import { commonService } from "@/services/common.service"
import { frontOfficeService } from "@/services/frontOffice.service"

const store = configureStore({
    reducer: {
        [auditService.reducerPath]: auditService.reducer,
        [userService.reducerPath]: userService.reducer,
        [authService.reducerPath]: authService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        [couponService.reducerPath]: couponService.reducer,
        [contentTypeService.reducerPath]: contentTypeService.reducer,
        [contentManagementService.reducerPath]: contentManagementService.reducer,
        [contentDetailManagementService.reducerPath]: contentDetailManagementService.reducer,
        [mediaService.reducerPath]: mediaService.reducer,
        [masterPageService.reducerPath]: masterPageService.reducer,
        [commonService.reducerPath]: commonService.reducer,
        [frontOfficeService.reducerPath]: frontOfficeService.reducer,
        rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            auditService.middleware,
            userService.middleware,
            authService.middleware,
            categoryService.middleware,
            couponService.middleware,
            contentTypeService.middleware,
            contentManagementService.middleware,
            contentDetailManagementService.middleware,
            mediaService.middleware,
            masterPageService.middleware,
            commonService.middleware,
            frontOfficeService.middleware
        ),
})

export default store
export type RootState = ReturnType<typeof store.getState>
