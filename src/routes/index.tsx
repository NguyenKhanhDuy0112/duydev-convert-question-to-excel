//UTILITIES
import { Suspense, lazy, useEffect } from "react"
import { RouteObject, createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

//CONSTANTS
import { CookieStorageKey, ProjectIDs } from "@/constants"

//HOOKS
import { useAuth, useCookieStorage } from "@/hooks"
import { useDispatch } from "react-redux"

//ENUMS
import { PageRoute } from "@/enums"

//SERVICES
import { useGetUserProfileApiQuery } from "@/services/user.service"
import { useGetLanguagesApiQuery } from "@/services/common.service"

//REDUX
import { login, logout } from "@/redux/modules/auth/authSlice"
import { updateProfile } from "@/redux/modules/profile/profileSlice"
import { updateState } from "@/redux/modules/common/commonSlice"

//MODELS
import { IUser } from "@/models"

//COMPONENTS
const Loader = lazy(() => import("@/components/Loader/Loader"))

//CONTAINERS
const UnAuthenticate = lazy(() => import("@/views/containers/UnAuthenticate"))
const Authenticate = lazy(() => import("@/views/containers/Authenticate"))

//PAGES
const Login = lazy(() => import("@/views/pages/Login"))
const Dashboard = lazy(() => import("@/views/pages/Dashboard"))
const About = lazy(() => import("@/views/pages/About"))
const NotFound = lazy(() => import("@/views/pages/NotFound"))
const Category = lazy(() => import("@/views/pages/Category"))
const Coupon = lazy(() => import("@/views/pages/Coupon"))
const ContentManagement = lazy(() => import("@/views/pages/ContentManagement"))
const UserManagement = lazy(() => import("@/views/pages/UserManagement"))
const MasterCenter = lazy(() => import("@/views/pages/MasterCenter"))
const Profile = lazy(() => import("@/views/pages/Profile"))
const MasterPage = lazy(() => import("@/views/pages/MasterPage"))
const MediaManagement = lazy(() => import("@/views/pages/MediaManagement"))
const SettingClearCache = lazy(() => import("@/views/pages/SettingClearCache"))
const GroupRoleManagement = lazy(() => import("@/views/pages/GroupRoleManagement"))
const LoyaltyProduct = lazy(() => import("@/views/pages/LoyaltyProduct"))
const LoyaltyCategory = lazy(() => import("@/views/pages/LoyaltyProductCategory"))
const LoyaltyMember = lazy(() => import("@/views/pages/LoyaltyMember"))
const LoyaltyTag = lazy(() => import("@/views/pages/LoyaltyTag"))

const appRoutes: RouteObject[] = [
    {
        path: "login",
        element: <UnAuthenticate />,
        children: [{ index: true, element: <Login /> }],
    },
    {
        path: "/",
        element: <Authenticate />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "categories",
                element: <Category />,
            },
            {
                path: "coupons",
                element: <Coupon />,
            },
            {
                path: "media-management",
                element: <MediaManagement />,
            },
            {
                path: "content-managements/:cateTypeID",
                element: <ContentManagement />,
            },
            {
                path: "master-center",
                element: <MasterCenter />,
            },
            {
                path: "master-page",
                element: <MasterPage />,
            },
            {
                path: "users-management",
                element: <UserManagement />,
            },
            {
                path: "group-role-management",
                element: <GroupRoleManagement />,
            },
            {
                path: "setting/clear-cache",
                element: <SettingClearCache />,
            },
            {
                path: PageRoute.LoyaltyCategory,
                element: <LoyaltyCategory />,
            },
            {
                path: PageRoute.LoyaltyProduct,
                element: <LoyaltyProduct />,
            },
            {
                path: PageRoute.LoyaltyMember,
                element: <LoyaltyMember />,
            },
            {
                path: PageRoute.LoyaltyTags,
                element: <LoyaltyTag />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]

const router = createBrowserRouter([
    {
        element: (
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        ),
        children: appRoutes,
    },
])

function ManageRoutes() {
    //HOOKS
    const dispatch = useDispatch()
    const { getCookie } = useCookieStorage()
    const { token } = useAuth()

    //SERVICES
    const { data: languages } = useGetLanguagesApiQuery({ project_id: ProjectIDs.Project_1 })
    const { data } = useGetUserProfileApiQuery(undefined, {
        skip: !token,
    })

    useEffect(() => {
        const accessToken = getCookie(CookieStorageKey.ACCESS_TOKEN)
        if (Boolean(accessToken)) {
            dispatch(login({ token: String(accessToken) }))
        } else {
            dispatch(logout())
            if (window.location.pathname !== PageRoute.Login) {
                window.location.href = PageRoute.Login
            }
        }
    }, [])

    useEffect(() => {
        dispatch(updateState({ languages: languages?.data || [] }))
    }, [languages?.data])

    useEffect(() => {
        dispatch(updateProfile({ ...data, permissions_name: data?.permissions?.map((item) => item?.name) } as IUser))
    }, [data])

    return <RouterProvider router={router} />
}

export default ManageRoutes
