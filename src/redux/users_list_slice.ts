import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../model/user";

const initialState = {
  isLoaded: false,
  error: false,
  list: Array<IUser>,
};

const recordsSlice = createSlice({
  name: "REQUEST_API_RECORD",
  initialState,
  reducers: {
    setList: (state, action) => {
      return {
        isLoaded: true,
        error: false,
        list: action.payload,
      };
    },
    onLoad: (state) => {
      state.isLoaded = false;
      state.error = false;
    },
    onError: (state) => {
      state.isLoaded = true;
      state.error = true;
    },
  },
});

export const { setList, onLoad, onError } = recordsSlice.actions;
const recordsReducer = recordsSlice.reducer;
export default recordsReducer;
