import { RootState } from "@/redux/index.store"
import { useSelector } from "react-redux"

function useAuth() {
    const auth = useSelector((state: RootState) => state.rootReducer.auth)
    return auth
}

export default useAuth
