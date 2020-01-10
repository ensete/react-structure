import { combineReducers } from 'redux'
import exReducer from "./exReducer";

const rootReducer = combineReducers({
  ex: exReducer,
});

export default rootReducer
