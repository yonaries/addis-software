import { combineReducers } from "@reduxjs/toolkit";
import uidReducer from "./uid_slice";
import recordsReducer from "./users_list_slice";

const allReducers = combineReducers({
    uid: uidReducer,
    records: recordsReducer
});
export default allReducers;