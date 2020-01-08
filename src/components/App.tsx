import React, { useContext, useEffect, useMemo } from 'react';
import logo from '../assets/images/logos/logo.svg';
import { AppContext } from "../reducers";
import { setExample } from "../actions/exAction";

const App: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const example2 = state.ex.example2;

  useEffect(() => {
    dispatch.exDispatch(setExample('a simple example'));
    // eslint-disable-next-line
  }, []);

  return useMemo(() => {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>{example2}</p>
          </header>
        </div>
    )
  }, [example2])
};

export default App;
