import { ICommonStore, IUser } from "@/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ICommonStore = {
    languages: [],
}

const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<ICommonStore>) => {
            return (state = { ...state, ...action.payload })
        },
    },
})

export default commonSlice.reducer

export const { updateState } = commonSlice.actions
