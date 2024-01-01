import BlankLayout from "@/views/layouts/BlankLayout";
import { Outlet } from "react-router-dom";

function UnAuthenticate() {
    
    return ( 
        <BlankLayout>
            <Outlet/>
        </BlankLayout>
     );
}

export default UnAuthenticate;