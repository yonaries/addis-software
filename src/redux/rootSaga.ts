import { call, put, takeLatest } from "redux-saga/effects";

import { fetchRecords, searchRecords } from "../api/users";
import { REQUEST_API_RECORD,REQUEST_API_RECORD_SEARCH } from "./sagaActions";
import { setList } from "./users_list_slice";

export function* fetchDataSaga() {
  try {
      const result: ReturnType<typeof fetchRecords> = yield call(()=> fetchRecords());
    yield put(setList(result));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_API_RECORD, fetchDataSaga);
}