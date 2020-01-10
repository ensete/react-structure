import { fork, all } from 'redux-saga/effects';
import exWatcher from './exSaga';

export default function* rootSaga() {
  yield all([
    fork(exWatcher),
  ]);
}
