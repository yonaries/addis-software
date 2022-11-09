import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current: 'user'
}

const uidSlice = createSlice({
    name: 'selectedView',
    initialState,
    reducers: {
        selectUid: (state, action) => {
            state.current = action.payload
        }
    }
})

export const { selectUid } = uidSlice.actions;
const uidReducer = uidSlice.reducer
export default uidReducer