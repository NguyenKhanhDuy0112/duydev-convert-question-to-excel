import { Suspense } from "react"
import { Outlet } from "react-router-dom"

//COMPONENTS
import Loader from "@/components/Loader/Loader"
import BlankLayout from "@/views/layouts/BlankLayout"
function UnAuthenticate() {
    return (
        <BlankLayout>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </BlankLayout>
    )
}

export default UnAuthenticate
