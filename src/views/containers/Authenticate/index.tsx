import Loader from "@/components/Loader/Loader"
import DefaultLayout from "@/views/layouts/DefaultLayout"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

function Authenticate() {
    return (
        <DefaultLayout>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </DefaultLayout>
    )
}

export default Authenticate
