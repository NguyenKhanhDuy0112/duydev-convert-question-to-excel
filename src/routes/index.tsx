import { Suspense, lazy, useEffect } from "react"
import { RouteObject, createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { CookieStorageKey } from "@/constants"

//HOOKS
import { useAuth, useCookieStorage } from "@/hooks"

//SERVICES
import { useGetUserprofileApiQuery } from "@/services/user.service"

//REDUX
import { useDispatch } from "react-redux"
import { login } from "@/redux/modules/auth/authSlice"
import Loader from "@/components/Loader/Loader"
import { updateProfile } from "@/redux/modules/profile/profileSlice"
import { IUser } from "@/models"
import { cookiesStorage } from "@/helpers/cookieStorage"
import MediaManagement from "@/views/pages/MediaManagement"

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
const FAQs = lazy(() => import("@/views/pages/GeneralContent/FAQs"))
const UserManagement = lazy(() => import("@/views/pages/UserManagement"))
const PersonalExperience = lazy(() => import("@/views/pages/PersonalExperience"))
const ContentTypeManagement = lazy(() => import("@/views/pages/ContentTypeManagement"))

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
                path: "general-contents",
                children: [
                    {
                        path: "FAQs",
                        element: <FAQs />,
                    },
                    {
                        path: "personal-experience",
                        element: <PersonalExperience />,
                    },
                ],
            },
            {
                path: "content-managements/:cateTypeID",
                element: <ContentManagement />,
            },
            {
                path: "content-type-managements",
                element: <ContentTypeManagement />,
            },
            {
                path: "users-management",
                element: <UserManagement />,
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
