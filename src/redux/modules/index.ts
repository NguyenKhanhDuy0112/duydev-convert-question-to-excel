import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import profileSlice from "./profile/profileSlice"
import commonSlice from "./common/commonSlice"

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    common: commonSlice,
})

export default rootReducer
