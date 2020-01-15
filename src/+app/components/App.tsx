import React, { useEffect, useMemo } from 'react';
import { useParams} from "react-router";
import { useHistory } from "react-router-dom";
import logo from 'src/assets/images/logos/logo.svg';
import { setExample } from "src/+app/actions/ex-action";
import { useSelector, useDispatch } from 'react-redux';

const App: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
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
            <button onClick={() => history.push("/otherPath/999")}>Other Path</button>
            <p>{id}</p>
          </header>
        </div>
    )
  }, [example2, id, history])
};

export default App;
