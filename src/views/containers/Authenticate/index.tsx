import DefaultLayout from "@/views/layouts/DefaultLayout";
import { Outlet } from "react-router-dom";

function Authenticate() {
    return ( 
        <DefaultLayout>
            <Outlet/>
        </DefaultLayout>
     );
}

export default Authenticate;