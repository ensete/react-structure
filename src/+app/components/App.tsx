import React, { useEffect, useMemo } from 'react';
import logo from 'src/assets/images/logos/logo.svg';
import { setExample } from "src/+app/actions/exAction";
import { useSelector, useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { example2 } = useSelector((state: any) => state.ex);

  useEffect(() => {
    dispatch(setExample('a simple example'));
  }, [dispatch]);

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
