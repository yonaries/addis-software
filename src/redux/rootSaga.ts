import { call, put, takeLatest } from "redux-saga/effects";

import { fetchRecords, searchRecords } from "../api/users";
import { REQUEST_API_RECORD, REQUEST_API_RECORD_SEARCH } from "./sagaActions";
import { onError, onLoad, setList } from "./users_list_slice";

export function* fetchDataSaga() {
  // fetch data from api and dispatch action to update store
  try {
    put(onLoad());
    const result: ReturnType<typeof fetchRecords> = yield call(() =>
      fetchRecords()
    );
    yield put(setList(result));
  } catch (error) {
    console.log(error);
    yield put(onError());
  }
}

type Params = { keyword: string; type: string };
export function* fetchSearchSaga({ keyword }: Params) {
  // fetch data from api and dispatch action to update store
  try {
    put(onLoad());
    const result: ReturnType<typeof searchRecords> = yield call(() =>
      searchRecords(keyword)
    );
    yield put(setList(result));
  } catch (error) {
    console.log(error);
    yield put(onError());
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_API_RECORD, fetchDataSaga);
  yield takeLatest(REQUEST_API_RECORD_SEARCH, fetchSearchSaga);
}
