import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoaded: false,
    list: []
}

const recordsSlice = createSlice({
    name: 'selectedView',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload
            state.isLoaded = true
        },
        onLoad: (state) => {
            state.isLoaded = false
        }
    }
})

export const { setList, onLoad } = recordsSlice.actions;
const recordsReducer = recordsSlice.reducer
export default recordsReducer