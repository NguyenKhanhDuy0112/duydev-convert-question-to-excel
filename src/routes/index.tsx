//UTILITIES
import { Suspense, lazy } from "react"
import { RouteObject, createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import { useDispatch } from "react-redux"

//COMPONENTS
const Loader = lazy(() => import("@/components/Loader/Loader"))

//PAGES
const Home = lazy(() => import("@/views/pages/Home"))
const NotFound = lazy(() => import("@/views/pages/NotFound"))

const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
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

    //SERVICES
    // const { data: languages } = useGetLanguagesApiQuery({ project_id: ProjectIDs.Project_1 })
    // const { data } = useGetUserProfileApiQuery(undefined, {
    //     skip: !token,
    // })

    // useEffect(() => {
    //     const accessToken = getCookie(CookieStorageKey.ACCESS_TOKEN)
    //     if (Boolean(accessToken)) {
    //         dispatch(login({ token: String(accessToken) }))
    //     } else {
    //         dispatch(logout())
    //         if (window.location.pathname !== PageRoute.Login) {
    //             window.location.href = PageRoute.Login
    //         }
    //     }
    // }, [])

    // useEffect(() => {
    //     dispatch(updateState({ languages: languages?.data || [] }))
    // }, [languages?.data])

    // useEffect(() => {
    //     dispatch(updateProfile({ ...data, permissions_name: data?.permissions?.map((item) => item?.name) } as IUser))
    // }, [data])

    return <RouterProvider router={router} />
}

export default ManageRoutes
