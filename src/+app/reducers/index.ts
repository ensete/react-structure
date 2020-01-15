import { combineReducers } from 'redux'
import exReducer from "./ex-reducer";

const rootReducer = combineReducers({
  ex: exReducer,
});

export default rootReducer
