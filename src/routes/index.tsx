//UTILITIES
import { Suspense, lazy, useEffect } from "react"
import { RouteObject, createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

//CONSTANTS
import { CookieStorageKey } from "@/constants"

//HOOKS
import { useAuth, useCookieStorage } from "@/hooks"
import { useDispatch } from "react-redux"

//SERVICES
import { useGetUserprofileApiQuery } from "@/services/user.service"

//REDUX
import { login } from "@/redux/modules/auth/authSlice"
import { updateProfile } from "@/redux/modules/profile/profileSlice"

//MODELS
import { IUser } from "@/models"
import SettingClearCache from "@/views/pages/SettingClearCache"

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
const MasterPage = lazy(() => import("@/views/pages/MasterPage"))
const MediaManagement = lazy(() => import("@/views/pages/MediaManagement"))

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
                path: "setting/clear-cache",
                element: <SettingClearCache />,
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
    const dispatch = useDispatch()

    const { getCookie } = useCookieStorage()
    const { token } = useAuth()

    const { data } = useGetUserprofileApiQuery(undefined, {
        skip: !token,
    })

    useEffect(() => {
        const accessToken = getCookie(CookieStorageKey.ACCESS_TOKEN)
        if (Boolean(accessToken)) {
            dispatch(login({ token: String(accessToken) }))
        }
    }, [])

    useEffect(() => {
        dispatch(updateProfile(data as IUser))
    }, [data])

    return <RouterProvider router={router} />
}

export default ManageRoutes
