import { CookieStorageKey } from "@/constants"
import { cookiesStorage } from "@/helpers/cookieStorage"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthStateProps {
    token: string
}

const initialState: AuthStateProps = {
    token: "",
}

const userSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthStateProps>) => {
            state.token = action.payload.token
            cookiesStorage.set(CookieStorageKey.ACCESS_TOKEN, action.payload.token)
        },
        updateAuth: (state, action: PayloadAction<AuthStateProps>) => {
            return (state = { ...state, ...action.payload })
        },
        logout: (state) => {
            cookiesStorage.remove(CookieStorageKey.ACCESS_TOKEN)
            return (state = {
                ...initialState,
            })
        },
    },
})

export default userSlice.reducer

export const { login, logout, updateAuth } = userSlice.actions
