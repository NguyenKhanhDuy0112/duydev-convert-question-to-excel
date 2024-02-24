import { RootState } from "@/redux/index.store"
import { useSelector } from "react-redux"

function useCommon() {
    const common = useSelector((state: RootState) => state.rootReducer.common)
    return common
}

export default useCommon
