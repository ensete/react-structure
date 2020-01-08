import React, { createContext, useReducer } from 'react';
import { initialExState, initEx, exReducer } from "./exReducer";

const AppContext = createContext({
  state: { ex: initialExState },
  dispatch: { exDispatch: (action) => {} }
});

function AppProvider(props) {
  const [ex, exDispatch] = useReducer(exReducer, initialExState, initEx);
  const provider = {
    state: { ex },
    dispatch: { exDispatch }
  };
  
  return (
    <AppContext.Provider value={provider}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
