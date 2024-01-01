import { RootState } from "@/redux/index.store"
import { useSelector } from "react-redux"

function useProfile() {
    const profile = useSelector((state: RootState) => state.rootReducer.profile)
    return profile
}

export default useProfile
