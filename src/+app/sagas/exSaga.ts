import { takeLatest, select } from 'redux-saga/effects';
import { exActionTypes } from "../actions/exAction";

const getEx = (state: any) => state.ex;

function* setExample(action: any) {
  console.log(action);
  console.log(yield select(getEx));
}

export default function* accountWatcher() {
  yield takeLatest(exActionTypes.SET_EXAMPLE, setExample);
}
