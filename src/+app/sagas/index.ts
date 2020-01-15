import { fork, all } from 'redux-saga/effects';
import exWatcher from './ex-saga';

export default function* rootSaga() {
  yield all([
    fork(exWatcher),
  ]);
}
