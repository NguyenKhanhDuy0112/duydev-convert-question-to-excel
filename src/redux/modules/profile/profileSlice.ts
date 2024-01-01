import { IUser } from "@/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IUser = {}

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<IUser>) => {
            return (state = { ...state, ...action.payload })
        },
    },
})

export default profileSlice.reducer

export const { updateProfile } = profileSlice.actions
