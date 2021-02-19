import { combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import localStorage from 'redux-persist/lib/storage'
import globalReducer from "src/app/reducers/globalReducer";
import accountReducer from "src/app/reducers/accountReducer";

const rootReducer = combineReducers({
  global: globalReducer,
  account: persistReducer({
    key: 'account',
    storage: localStorage,
    whitelist: ['address', 'type']
  }, accountReducer),
});

export default rootReducer
