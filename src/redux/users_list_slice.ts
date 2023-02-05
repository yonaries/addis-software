import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../model/user'

const initialState = {
    isLoaded: false,
    list: Array<IUser>
}

const recordsSlice = createSlice({
    name: 'REQUEST_API_RECORD',
    initialState,
    reducers: {
        setList: (state, action) => {
            return {
                isLoaded:true,
                list:action.payload
            }
        },
        onLoad: (state) => {
            state.isLoaded = false
        }
    }
})

export const { setList, onLoad } = recordsSlice.actions;
const recordsReducer = recordsSlice.reducer
export default recordsReducer