import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import profileSlice from "./profile/profileSlice"

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
})

export default rootReducer
